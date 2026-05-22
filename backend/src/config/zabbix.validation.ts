import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class EnvironmentVariables {
  @IsOptional()
  @IsNumber()
  PORT?: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  ZABBIX_URL!: string;

  @IsString()
  @IsNotEmpty()
  ZABBIX_USER!: string;

  @IsString()
  @IsNotEmpty()
  ZABBIX_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  GEMINI_API_KEY!: string;
}
