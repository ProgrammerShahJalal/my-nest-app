import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule], // Import the UserModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}