console.log("BOOTING NESTJS...");
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log("CREATING APP...");
    const app = await NestFactory.create(AppModule);
    
    // Configurar CORS
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    console.log("APP CREATED, LISTENING ON PORT", process.env.PORT ?? 3000);
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}
bootstrap();
