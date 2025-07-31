import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [UserModule, CatModule], // Import both UserModule and CatModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}