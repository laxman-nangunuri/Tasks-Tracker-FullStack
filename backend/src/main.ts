import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

const config = new DocumentBuilder()
        .setTitle('Task Tracker API')
        .setDescription('Task Management APIs')
        .setVersion('1.0')
        .addBasicAuth()
        .build();

const document = SwaggerModule.createDocument(app,config,);

SwaggerModule.setup('api',app, document);

app.useGlobalPipes(new ValidationPipe(),);

app.enableCors();

await app.listen(3000);
}

bootstrap();