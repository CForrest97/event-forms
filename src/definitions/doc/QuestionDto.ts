import {
  IsArray, IsNotEmpty, IsString, ValidateNested, IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

import OptionDto from './OptionDto';
import ValidationDto from './ValidationDto';

class QuestionDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options?: OptionDto[];

  // @IsOptional()
  validation: ValidationDto;
}
export default QuestionDto;
