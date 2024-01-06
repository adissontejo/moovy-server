import 'dotenv/config';

import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dbConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE || 'moovy',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
};

export default registerAs('db', () => dbConfig);

export const connectionSource = new DataSource(dbConfig as DataSourceOptions);
