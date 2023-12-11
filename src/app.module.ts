import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
