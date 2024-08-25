import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCarDto{
  @IsString()
  carId: string;
  
  @IsString()
  @IsOptional()
  brand?: string;

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
