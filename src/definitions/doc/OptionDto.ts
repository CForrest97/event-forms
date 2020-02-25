import {
  IsNotEmpty, IsString,
} from 'class-validator';

export default class OptionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
