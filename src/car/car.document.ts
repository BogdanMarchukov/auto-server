import { IsString } from "class-validator";
import { CarBaseDocument } from "./base/car.base.document";
import { Transform } from "class-transformer";

export class CarDocument extends CarBaseDocument {
  @IsString()
  @Transform(({ value }) => value.toString())
  authorId: string;
}
