import { Transform } from "class-transformer";
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class GetCarsDto {
  @IsString()
  brand: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? value : +value))
  productionYear?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === undefined ? value : +value))
  price?: number;
}
