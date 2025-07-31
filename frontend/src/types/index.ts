// User types
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  age: number;
  role: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  role?: string;
}

// Cat types
export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number;
  isVaccinated: boolean;
  owner?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCatDto {
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number;
  isVaccinated: boolean;
  owner?: string;
}

export interface UpdateCatDto {
  name?: string;
  age?: number;
  breed?: string;
  color?: string;
  weight?: number;
  isVaccinated?: boolean;
  owner?: string;
}

export interface CatStatistics {
  totalCats: number;
  vaccinatedCats: number;
  unvaccinatedCats: number;
  breeds: string[];
  averageAge: number;
  averageWeight: number;
}
