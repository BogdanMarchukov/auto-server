import { Transform } from "class-transformer";
import {
    IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Sort, SortBy } from "../types/type";

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

  @IsEnum(SortBy)
  @IsOptional()
  sortBy?: SortBy

  @IsEnum(Sort)
  @IsOptional()
  sort?: Sort
}
