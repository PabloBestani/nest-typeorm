import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      autoLoadEntities: true,
      synchronize: true, // QUITAR ESTE al llevarlo a produccion
      ssl: process.env.POSTGRES_SSL  === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
          ? {
            rejectUnauthorized: false,
          }
          : null,
      },
    }),
    CatsModule,
    BreedsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
