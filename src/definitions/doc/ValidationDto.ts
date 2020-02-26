import {
  IsString, IsBoolean, IsNumber, IsOptional,
} from 'class-validator';

export default class ValidationDto {
  // @IsOptional()
  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsNumber()
  maxLength?: number;

  @IsOptional()

  @IsString()
  pattern?: string;

  @IsOptional()
  @IsString()
  validationMessage?: string;
}
