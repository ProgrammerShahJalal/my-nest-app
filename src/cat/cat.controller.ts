import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../interfaces/cat.interface';

@Controller('cats') // This creates routes starting with /cats
export class CatController {
  constructor(private readonly catService: CatService) {}

  // POST /cats - Create a new cat
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatDto: CreateCatDto): Cat {
    return this.catService.create(createCatDto);
  }

  // GET /cats - Get all cats with optional filters
  @Get()
  findAll(
    @Query('breed') breed?: string,
    @Query('owner') owner?: string,
    @Query('vaccinated') vaccinated?: string,
  ): Cat[] {
    if (breed) {
      return this.catService.findByBreed(breed);
    }
    if (owner) {
      return this.catService.findByOwner(owner);
    }
    if (vaccinated === 'true') {
      return this.catService.findVaccinated();
    }
    if (vaccinated === 'false') {
      return this.catService.findUnvaccinated();
    }
    return this.catService.findAll();
  }

  // GET /cats/statistics - Get cat statistics
  @Get('statistics')
  getStatistics(): any {
    return this.catService.getStatistics();
  }

  // GET /cats/:id - Get cat by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Cat {
    return this.catService.findOne(id);
  }

  // PUT /cats/:id - Update cat by ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Cat {
    return this.catService.update(id, updateCatDto);
  }

  // DELETE /cats/:id - Delete cat by ID
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.catService.remove(id);
  }
}
