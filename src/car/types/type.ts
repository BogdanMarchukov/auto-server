import { ObjectId } from "mongodb";

export interface findManyFilter {
  brand: string;
  model?: string;
  productionYear?: number;
  price?: number;
}
