import { registerAs } from '@nestjs/config';

export default registerAs('zabbix', () => ({
  url: process.env.ZABBIX_URL ?? '',
  user: process.env.ZABBIX_USER ?? '',
  password: process.env.ZABBIX_PASSWORD ?? '',
}));
