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

export enum SortBy {
  BRAND = "brand",
  MODEL = "model",
  PRODUCTION_YEAR = "productionYear",
  PRICE = "price",
}

export enum Sort {
  ASC = 'asc',
  DESC = 'descending'
}
