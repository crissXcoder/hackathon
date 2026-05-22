import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AiService implements OnModuleInit {
  private readonly logger = new Logger(AiService.name);
  private model: ChatGoogleGenerativeAI;
  private vectorStore: MemoryVectorStore;
  private embeddings: GoogleGenerativeAIEmbeddings;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    
    if (!apiKey) {
      this.logger.error('GEMINI_API_KEY not found in environment variables!');
    }

    try {
      this.model = new ChatGoogleGenerativeAI({
        apiKey,
        modelName: 'gemini-2.5-flash-lite',
        maxOutputTokens: 2048,
        temperature: 0.1,
      });

      this.embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey,
        modelName: 'embedding-001',
      });

      this.logger.log('Gemini model and embeddings initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Gemini components', error.stack);
    }
  }

  async onModuleInit() {
    await this.loadManufacturerDocs();
  }

  async loadManufacturerDocs() {
    const docsPath = path.resolve(process.cwd(), '..', 'docs');
    
    if (!fs.existsSync(docsPath)) {
      this.logger.warn(`Docs directory not found at ${docsPath}. Skipping RAG initialization.`);
      return;
    }

    try {
      this.logger.log(`Loading documents from: ${docsPath}`);
      const loader = new DirectoryLoader(docsPath, {
        '.pdf': (path: string) => new PDFLoader(path),
      });

      const docs = await loader.load();
      if (docs.length === 0) {
        this.logger.warn('No documents found in docs folder.');
        return;
      }

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const splitDocs = await textSplitter.splitDocuments(docs);
      this.vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, this.embeddings);

      this.logger.log(`Vector store initialized with ${splitDocs.length} chunks.`);
    } catch (error) {
      this.logger.error(`Error loading manufacturer docs: ${error.message}`, error.stack);
    }
  }

  async analyzeDeviceHealth(deviceData: any): Promise<any> {
    if (!this.model) throw new Error('AI model not initialized.');

    let context = 'No documentation available for this device.';
    if (this.vectorStore) {
      const query = `maximum operating temperature and CPU thresholds for ${deviceData.name} ${deviceData.model || ''}`;
      const searchResults = await this.vectorStore.similaritySearch(query, 3);
      context = searchResults.map((d: any) => d.pageContent).join('\n---\n');
    }

    const prompt = PromptTemplate.fromTemplate(`
      Eres un ingeniero de NOC experto. Analiza los siguientes datos en vivo de un equipo de red:
      DATOS ZABBIX: {datos_zabbix}

      Basado EXCLUSIVAMENTE en esta documentación del fabricante:
      CONTEXTO FABRICANTE: {contexto_fabricante}

      Determina si el equipo está en riesgo de fallo a corto plazo o degradación.
      Debes responder ÚNICAMENTE con un objeto JSON válido con esta estructura:
      {{
        "status": "healthy" | "warning" | "critical",
        "predictiveAlert": "Razón del riesgo predictivo",
        "recommendation": "Qué debe hacer el técnico"
      }}
    `);

    const chain = RunnableSequence.from([
      prompt,
      this.model,
      new StringOutputParser(),
    ]);

    try {
      this.logger.debug(`Analyzing health for device: ${deviceData.name}`);
      
      const response = await chain.invoke({
        datos_zabbix: JSON.stringify(deviceData),
        contexto_fabricante: context,
      });

      const cleanJson = response.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);

    } catch (error) {
      this.logger.error(`Analysis failed for ${deviceData.name}: ${error.message}`);
      return {
        status: 'warning',
        predictiveAlert: 'Analysis failed or timeout',
        recommendation: 'Check Zabbix manually and verify AI connectivity'
      };
    }
  }

  async diagnoseSpikes(deviceHistory: any): Promise<any> {
    if (!this.model) throw new Error('AI model not initialized.');

    let context = 'No documentation available for this device.';
    if (this.vectorStore) {
      const query = `troubleshooting thermal and CPU spikes for device id ${deviceHistory.id}`;
      const searchResults = await this.vectorStore.similaritySearch(query, 3);
      context = searchResults.map((d: any) => d.pageContent).join('\n---\n');
    }

    const prompt = PromptTemplate.fromTemplate(`
      Eres un ingeniero de NOC experto. Revisa el siguiente historial de fallos críticos simulados de este equipo:
      HISTORIAL DE DISPOSITIVO: {history}

      Basándote EXCLUSIVAMENTE en la siguiente documentación del fabricante (si aplica):
      CONTEXTO FABRICANTE: {contexto_fabricante}

      Debes responder ÚNICAMENTE con un objeto JSON válido con esta estructura:
      {{
        "rootCause": "Posible causa técnica detallada",
        "impact": "Qué pasará si no se arregla (ej. degradación de silicio, corte de red)",
        "solutionSteps": [
          "Paso 1 exacto para resolverlo",
          "Paso 2 exacto para resolverlo",
          "Paso 3 exacto para resolverlo"
        ]
      }}
    `);

    const chain = RunnableSequence.from([
      prompt,
      this.model,
      new StringOutputParser(),
    ]);

    try {
      this.logger.debug(`Diagnosing spikes for device: ${deviceHistory.id}`);
      
      const response = await chain.invoke({
        history: JSON.stringify(deviceHistory),
        contexto_fabricante: context,
      });

      const cleanJson = response.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);

    } catch (error) {
      this.logger.error(`Diagnosis failed for ${deviceHistory.id}: ${error.message}`);
      return {
        rootCause: 'Error al contactar IA',
        impact: 'Desconocido - Diagnóstico fallido',
        solutionSteps: ['Verificar logs de red manualmente']
      };
    }
  }

  async generateResponse(prompt: string, useRAG = false): Promise<string> {
    if (!this.model) throw new Error('AI model not initialized.');
    let finalPrompt = prompt;
    if (useRAG && this.vectorStore) {
      const contextDocs = await this.vectorStore.similaritySearch(prompt, 3);
      finalPrompt = `Context: ${contextDocs.map((d: any) => d.pageContent).join('\n')}\n\nQuestion: ${prompt}`;
    }
    const response = await this.model.invoke(finalPrompt);
    return response.content as string;
  }
}
