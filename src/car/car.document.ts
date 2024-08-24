import { IsString } from "class-validator";
import { CarBaseDocument } from "./base/car.base.document";

export class CarDocument extends CarBaseDocument {
  @IsString()
  authorId: string;
}
