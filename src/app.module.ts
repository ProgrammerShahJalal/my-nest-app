import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, CatModule, BlogModule], // Import UserModule, CatModule, and BlogModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}