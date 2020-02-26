import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Validator } from 'class-validator';
import { insert } from '../common/database.service';
import DefinitionsService from '../definitions/definitions.service';
// eslint-disable-next-line import/extensions
import config from '../config';

const db = config.database.submissions;

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

  if (validator.isDefined(validation)) {
    const { required, maxLength, pattern } = validation;

    if (required && !validator.isDefined(value)) return false;
    if (!required && !validator.isDefined(value)) return true;
    if (validator.isDefined(maxLength) && !validator.maxLength(value, maxLength)) return false;
    if (validator.isDefined(pattern)
      && !validator.matches(value, new RegExp(pattern))) return false;
  }
  return true;
};

export const isValidSubmission = async (submission): Promise<boolean> => {
  const definitionsService = new DefinitionsService();
  const match = await definitionsService.getDefinition(submission.serviceKey);

  if (match == null) throw new HttpException('service name not found', HttpStatus.NOT_FOUND);

  return match.questions.every((question) => validateQuestion(question, submission));
};

@Injectable()
export class SubmissionsService {
  async insertSubmission(submission: ISubmission) {
    const isValid = await isValidSubmission(submission);
    if (isValid) {
      await insert(db, submission);
      return;
    }
    throw new HttpException('invalid submission', HttpStatus.BAD_REQUEST);
  }
}
