import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';



@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_URL || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'test' ,
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DEFAULT_DB || 'test',
      entities: [UserEntity],
      synchronize: true,
      // logging: true,
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
