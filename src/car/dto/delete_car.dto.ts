import { IsString } from "class-validator";

export class DeleteCarDto {
  @IsString()
  carId: string;
}
