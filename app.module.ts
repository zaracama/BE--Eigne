import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { MembersModule } from './members/members.module';
import { BooksModule } from './Controllers/Member/Books/books.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MembersModule,
    BooksModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer) {
    const options = new DocumentBuilder()
      .setTitle('Library Management')
      .setDescription('Library management API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(consumer, options);
    SwaggerModule.setup('api', consumer, document);
  }
}
