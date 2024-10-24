import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { CpeApiController } from './cpe/cpe.controller';
import { CpeApiService } from './cpe/cpe.service';  
import { CveApiController } from './cve/cve.controller';
import { CveApiService } from './cve/cve.service';
import { CustomersModule } from './customers/customers.module'; 

// Manually load .env file using dotenv
dotenv.config({ path: join(__dirname, '..', '.env') });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '.env'), // Explicitly specify the .env path
      isGlobal: true, // Ensures it's available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    CustomersModule, 
  ],
  controllers: [AppController, CpeApiController, CveApiController],
  providers: [AppService, CpeApiService, CveApiService],
})
export class AppModule {
  constructor() {
    // Log the values after the module is initialized to verify
    console.log('Database Host:', process.env.DATABASE_HOST);
    console.log('ApiKey:', process.env.NVD_API_KEY);
  }
}
