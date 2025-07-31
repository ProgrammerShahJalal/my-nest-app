import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';

@Injectable()
export class CatService {
  private cats: Cat[] = [
    {
      id: 1,
      name: 'Whiskers',
      age: 3,
      breed: 'Persian',
      color: 'White',
      weight: 4.5,
      isVaccinated: true,
      owner: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Shadow',
      age: 2,
      breed: 'Siamese',
      color: 'Black',
      weight: 3.8,
      isVaccinated: true,
      owner: 'Jane Smith',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Fluffy',
      age: 1,
      breed: 'Maine Coon',
      color: 'Orange',
      weight: 2.5,
      isVaccinated: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  
  private nextId = 4;

  // CREATE - Add a new cat
  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: this.nextId++,
      ...createCatDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.cats.push(newCat);
    return newCat;
  }

  // READ - Get all cats
  findAll(): Cat[] {
    return this.cats;
  }

  // READ - Get cat by ID
  findOne(id: number): Cat {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  // UPDATE - Update cat by ID
  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    const updatedCat = {
      ...this.cats[catIndex],
      ...updateCatDto,
      updatedAt: new Date(),
    };

    this.cats[catIndex] = updatedCat;
    return updatedCat;
  }

  // DELETE - Remove cat by ID
  remove(id: number): { message: string } {
    const catIndex = this.cats.findIndex(cat => cat.id === id);
    
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    const deletedCat = this.cats[catIndex];
    this.cats.splice(catIndex, 1);
    return { message: `Cat "${deletedCat.name}" with ID ${id} has been deleted successfully` };
  }

  // Additional helper methods
  findByBreed(breed: string): Cat[] {
    return this.cats.filter(cat => cat.breed.toLowerCase() === breed.toLowerCase());
  }

  findByOwner(owner: string): Cat[] {
    return this.cats.filter(cat => cat.owner?.toLowerCase().includes(owner.toLowerCase()));
  }

  findVaccinated(): Cat[] {
    return this.cats.filter(cat => cat.isVaccinated === true);
  }

  findUnvaccinated(): Cat[] {
    return this.cats.filter(cat => cat.isVaccinated === false);
  }

  // Get statistics
  getStatistics(): any {
    const totalCats = this.cats.length;
    const vaccinatedCats = this.findVaccinated().length;
    const breeds = [...new Set(this.cats.map(cat => cat.breed))];
    const averageAge = this.cats.reduce((sum, cat) => sum + cat.age, 0) / totalCats;
    const averageWeight = this.cats.reduce((sum, cat) => sum + cat.weight, 0) / totalCats;

    return {
      totalCats,
      vaccinatedCats,
      unvaccinatedCats: totalCats - vaccinatedCats,
      breeds,
      averageAge: Math.round(averageAge * 10) / 10,
      averageWeight: Math.round(averageWeight * 100) / 100,
    };
  }
}
