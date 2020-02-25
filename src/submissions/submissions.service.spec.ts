import { Test, TestingModule } from '@nestjs/testing';
import {
  SubmissionsService, isValidSubmission, getValue, validateQuestion,
} from './submissions.service';
import * as databaseService from '../database.service';
import DefinitionsService from '../definitions/definitions.service';
import DefinitionsController from '../definitions/definitions.controller';

describe('SubmissionsService', () => {
  // let definitionController: DefinitionsController;
  let definitionService: DefinitionsService;
  const insertMock = jest.spyOn(databaseService, 'insert');
  const getOneDefinitionMock = jest.spyOn(databaseService, 'getOne');
  insertMock.mockReturnValue(null);
  getOneDefinitionMock.mockReturnValue(null);

  let submission: ISubmission;
  // let submissionsController: SubmissionsController;

  beforeEach(async () => {
    submission = {
      key: 'key',
      name: 'name',
      date: new Date(),
      serviceKey: 'confetti',
      questions: [],
      dateCreated: new Date(),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DefinitionsController],
      providers: [DefinitionsService],
    }).compile();

    // definitionController = app.get<DefinitionsController>(DefinitionsController);
    definitionService = app.get<DefinitionsService>(DefinitionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getValue', () => {
    describe('success scenarios', () => {
      it('should find the value for a key in a submission', () => {
        const expectedResponse = 'body data';
        const questionSubmission: IQuestionSubmission = { questionKey: 'body', value: expectedResponse };
        submission.questions = [questionSubmission];
        expect(getValue(submission, 'body')).toEqual(expectedResponse);
      });
    });
    describe('failure scenarios', () => {
      it('should return undefined for a key not in a submission', () => {
        submission.questions = [];
        expect(getValue(submission, 'body')).toEqual(undefined);
      });
    });
  });

  describe('validateQuestion', () => {
    describe('success scenarios', () => {
      it('should validate a question WITH all required fields', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'body', value: 'body data' };
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { required: true },
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(true);
      });
      it('should validate a question that does not exist but is not required', () => {
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { required: false },
        };
        submission.questions = [];
        expect(validateQuestion(question, submission)).toBe(true);
      });
      it('should validate a question WITH less than the max length', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'body', value: 'body data' };
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { maxLength: 250 },
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(true);
      });
      it('should validate a question WITH length equal to the max length', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'body', value: 'body data' };
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { maxLength: 9 },
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(true);
      });
      it('should validate a question WITH the right pattern', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'body', value: 'boooody data' };
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { pattern: 'bo+dy data' },
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(true);
      });
      it('should validate a question WITH a value in the options', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'type', value: 'birthday' };
        const question: IQuestion = {
          key: 'type',
          type: 'radios',
          options: [
            { name: 'Birthday', value: 'birthday' },
            { name: 'Wedding', value: 'wedding' },
            { name: 'Stag Party', value: 'stagparty' },
          ],
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(true);
      });
    });
    describe('failure scenarios', () => {
      it('should validate a question WITHOUT all required fields', () => {
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { required: true },
        };
        submission.questions = [];
        expect(validateQuestion(question, submission)).toBe(false);
      });
      it('should validate a question WITH more than the max length', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'body', value: 'body data' };
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { maxLength: 5 },
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(false);
      });
      it('should validate a question WITHOUT the right pattern', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'body', value: 'bdy data' };
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { pattern: 'bo+dy data' },
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(false);
      });
      it('should validate a question WITHOUT a value in the options', () => {
        const questionSubmission: IQuestionSubmission = { questionKey: 'type', value: 'funeral' };
        const question: IQuestion = {
          key: 'type',
          type: 'radios',
          options: [
            { name: 'Birthday', value: 'birthday' },
            { name: 'Wedding', value: 'wedding' },
            { name: 'Stag Party', value: 'stagparty' },
          ],
        };
        submission.questions = [questionSubmission];
        expect(validateQuestion(question, submission)).toBe(false);
      });
    });
  });

  describe('isValidSubmission', () => {
    describe('success scenarios', () => {
      it('should pass a submission with no required questions', async () => {
        const definition: IDefinition = {
          name: 'confetti',
          questions: [],
        };
        getOneDefinitionMock.mockResolvedValue(definition);
        const isValid = await isValidSubmission(submission);

        expect(isValid).toBe(true);
      });
      it('should pass a submission with all required questions', async () => {
        const questionSubmission1: IQuestionSubmission = { questionKey: 'type', value: 'birthday' };
        const questionSubmission2: IQuestionSubmission = { questionKey: 'body', value: 'body data' };
        const question1: IQuestion = {
          key: 'type',
          type: 'radios',
          options: [
            { name: 'Birthday', value: 'birthday' },
            { name: 'Wedding', value: 'wedding' },
            { name: 'Stag Party', value: 'stagparty' },
          ],
        };
        const question2: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { required: true },
        };
        const definition: IDefinition = {
          name: 'confetti',
          questions: [question1, question2],
        };
        submission.questions = [questionSubmission1, questionSubmission2];

        getOneDefinitionMock.mockResolvedValue(definition);
        const isValid = await isValidSubmission(submission);

        expect(isValid).toBe(true);
      });
    });
    describe('failure scenarios', () => {
      it('should fail a submission missing required questions', async () => {
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { required: true },
        };
        const definition: IDefinition = {
          name: 'confetti',
          questions: [question],
        };
        jest.spyOn(definitionService, 'getDefinition').mockImplementation(async () => definition);
        getOneDefinitionMock.mockResolvedValue(definition);
        const isValid = await isValidSubmission(submission);

        expect(isValid).toBe(false);
      });
    });
  });

  describe('insertSubmission', () => {
    describe('success scenarios', () => {
      it('should fail a submission missing required questions', async () => {
        const submissionService = new SubmissionsService();
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { required: true },
        };
        const definition: IDefinition = {
          name: 'confetti',
          questions: [question],
        };
        jest.spyOn(definitionService, 'getDefinition').mockImplementation(async () => definition);
        getOneDefinitionMock.mockResolvedValue(definition);

        const questionSubmission1: IQuestionSubmission = { questionKey: 'body', value: 'whole body' };

        submission.questions = [questionSubmission1];
        await submissionService.insertSubmission('', submission);

        expect(insertMock).toHaveBeenCalled();
      });
    });
    describe('failure scenarios', () => {
      it('should fail a submission missing required questions', async () => {
        const submissionService = new SubmissionsService();
        const question: IQuestion = {
          key: 'body',
          type: 'textArea',
          validation: { required: true },
        };
        const definition: IDefinition = {
          name: 'confetti',
          questions: [question],
        };
        jest.spyOn(definitionService, 'getDefinition').mockImplementation(async () => definition);
        getOneDefinitionMock.mockResolvedValue(definition);

        submission.questions = [];
        let error;
        try {
          await submissionService.insertSubmission('', submission);
        } catch (err) {
          error = err;
        }
        expect(insertMock).not.toBeCalled();
        expect(error).toBeDefined();
        expect(error.message).toBe('invalid submission');
      });
    });
  });
});
