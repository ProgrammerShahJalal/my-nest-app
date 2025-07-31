export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number; // in kg
  isVaccinated: boolean;
  owner?: string;
  createdAt: Date;
  updatedAt: Date;
}
