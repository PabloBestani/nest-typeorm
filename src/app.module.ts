import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      autoLoadEntities: true,
      synchronize: true, // QUITAR ESTE al llevarlo a produccion
    }),
    CatsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
