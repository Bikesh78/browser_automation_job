import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JobsService } from './jobs/jobs.service';
import { startJobProcessor } from './jobs/processor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const jobsService = app.get(JobsService);
  startJobProcessor(jobsService);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
