import { IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CarDocument {
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

  @IsString()
  authorId: string;
}
