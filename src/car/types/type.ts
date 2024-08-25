import { ObjectId } from "mongodb";

export interface FindManyFilter {
  brand: string;
  model?: string;
  productionYear?: number;
  price?: number;
}

export interface UpdateInputData {
  brand?: string;
  model?: string;
  productionYear?: number;
  price?: number;
}
