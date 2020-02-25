import {
  IsNotEmpty, IsString, ValidateNested,
} from 'class-validator';

import QuestionDto from './QuestionDto';

export default class DefinitionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  questions: QuestionDto[];
}
