import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService], // Export if other modules need to use CatService
})
export class CatModule {}
