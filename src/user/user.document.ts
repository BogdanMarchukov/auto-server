import { IsOptional, IsString, MinLength } from "class-validator";
import { ObjectId } from "mongodb";

export class UserDocument {
  @IsOptional()
  _id: string | ObjectId;

  @IsString()
  username: string;

  @IsString()
  @MinLength(5)
  password: string;
}
