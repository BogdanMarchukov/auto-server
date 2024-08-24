import { IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CarBaseDocument {
  @IsOptional()
  _id: string | ObjectId;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  productionYear: string;

  @IsNumber()
  price: number;
}
