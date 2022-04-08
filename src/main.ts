import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from 'src/util/swagger';
import * as fs from 'fs';

const PORT = 443 //포트 고정

async function bootstrap() {
  const corsOptions = {
		origin: [
			'https://test.dahyeon.us',
      'https://dahyeon.us',
		],
		methods: 'GET,OPTIONS,PUT,PATCH,POST,DELETE',
		allowedHeaders: ['Content-Type', 'Authorization'],
		exposedHeaders: ['Content-Type'],
		credentials: true,
	};
  const validationPipeOptions = {
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		disableErrorMessages: false,
	};

  try {
    const httpsOptions = {
			key: fs.readFileSync('./secrets/dahyeon.us.key', 'utf8'),
			cert: fs.readFileSync('./secrets/dahyeon.us.crt', 'utf8'),
			ca: fs.readFileSync('./secrets/dahyeon.us.cacerts.cer', 'utf-8')
		};
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
			httpsOptions,
			logger: ['error', 'warn', 'log', 'debug', 'verbose'],
		});
		app.enableCors(corsOptions);
    setupSwagger(app);
    await app.listen(PORT);
		console.log(`서버가 HTTPS 프로토콜로 ${PORT}번 포트에서 실행되었습니다.`);
  } catch(err) {
    console.log(err)
  }
}
bootstrap();
