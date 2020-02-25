import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Validator } from 'class-validator';
import { insert } from '../common/database.service';
import DefinitionsService from '../definitions/definitions.service';

const validator = new Validator();

export const getValue = (submission: ISubmission, key) => {
  const question = submission.questions.find(({ questionKey }) => questionKey === key);
  return question ? question.value : undefined;
};

export const validateQuestion = (question: IQuestion, submission: ISubmission): boolean => {
  const { key, validation, options } = question;
  const value = getValue(submission, key);

  if (validator.isDefined(options)) {
    return options.some(({ value: optionValue }) => optionValue === value);
  }

  const { required, maxLength, pattern } = validation;

  if (required && !validator.isDefined(value)) return false;
  if (!required && !validator.isDefined(value)) return true;
  if (validator.isDefined(maxLength) && !validator.maxLength(value, maxLength)) return false;
  if (validator.isDefined(pattern) && !validator.matches(value, new RegExp(pattern))) return false;
  return true;
};

export const isValidSubmission = async (submission): Promise<boolean> => {
  const definitionsService = new DefinitionsService();
  const { questions } = await definitionsService.getDefinition(submission.serviceKey);

  return questions.every((question) => validateQuestion(question, submission));
};

@Injectable()
export class SubmissionsService {
  async insertSubmission(name, submission) {
    const isValid = await isValidSubmission(submission);
    if (isValid) {
      return insert('submissions', name, submission);
    }
    throw new HttpException('invalid submission', HttpStatus.BAD_REQUEST);
  }
}
