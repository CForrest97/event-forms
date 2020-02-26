import { Test, TestingModule } from '@nestjs/testing';
import SubmissionController from './submissions.controller';
import { SubmissionsService } from './submissions.service';

describe('SubmissionController', () => {
  let submissionController: SubmissionController;
  let submissionService: SubmissionsService;

  beforeEach(async () => {
    const submission: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionController],
      providers: [SubmissionsService],
    }).compile();

    submissionController = submission.get<SubmissionController>(SubmissionController);
    submissionService = submission.get<SubmissionsService>(SubmissionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('postSubmissions', () => {
    it('should throw an error if submissionService.getSubmissions throws', async () => {
      const error = new Error('default error');
      jest.spyOn(submissionService, 'insertSubmission').mockImplementation(async () => { throw error; });
      expect(submissionController.postSubmission({ name: 'name' })).rejects.toBe(error);
    });
  });
});
