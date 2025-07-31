import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend applications
  app.enableCors();
  
  // Global prefix for all routes (optional)
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
  console.log('🚀 Application is running on: http://localhost:3000');
  console.log('📚 API endpoints available at: http://localhost:3000/api/users');
  console.log('📖 Check NESTJS_LEARNING_GUIDE.md for complete tutorial!');
}
bootstrap();