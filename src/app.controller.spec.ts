import { Test, TestingModule } from '@nestjs/testing';
import AppController from './app.controller';
import AppService from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  }); 
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });
  
  describe('getDefinition', () => {
    it('should return a definition', async () => {
      const definition = { name: 'definition1' };
      jest.spyOn(appService, 'getDefinition').mockImplementation(async () => definition);
      const response =  await appController.getDefinition('definition1')
      expect(response).toEqual(definition);
    });
    it('should throw an error if appService.getDefinitions throws', async () => {
      const error = new Error('default error');
      jest.spyOn(appService, 'getDefinition').mockImplementation(async () => { throw error });
      expect(appController.getDefinition('definition1')).rejects.toBe(error);
    });
  });

  describe('getDefinitions', () => {
    it('should return all definitions', async () => {
      const definitions = [{ name: 'definition1' }, { name: 'definition2' }];
      jest.spyOn(appService, 'getDefinitions').mockImplementation(async () => definitions);
      expect(appController.getDefinitions()).resolves.toBe(definitions);
    });
    it('should throw an error if appService.getDefinitions throws', async () => {
      const error = new Error('default error');
      jest.spyOn(appService, 'getDefinitions').mockImplementation(async () => { throw error });
      expect(appController.getDefinitions()).rejects.toBe(error);
    });
  });

  describe('postDefinitions', () => {
    // it.skip('should recieve success message', async () => {
    //   const definition = { name: 'definition1' };
    //   const response = {
    //     writeTime: {
    //       '_seconds': 1582493896,
    //       '_nanoseconds': 165074000,
    //     }
    //   };
    //   jest.spyOn(appService, 'insertDefinition').mockImplementation(async () => {});
    //   expect(appController.postDefinition('definition1', definition)).resolves.toBe(response);
    // });
    it('should throw an error if appService.getDefinitions throws', async () => {
      const error = new Error('default error');
      jest.spyOn(appService, 'insertDefinition').mockImplementation(async () => { throw error });
      expect(appController.postDefinition({}, 'definition1')).rejects.toBe(error);
    });
  });
});
