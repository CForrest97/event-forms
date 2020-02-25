import { Test, TestingModule } from '@nestjs/testing';
import DefinitionsController from './definitions.controller';
import DefinitionsService from './definitions.service';
import DefinitionDto from './doc/DefinitionDto';

describe('DefinitionsController', () => {
  let definitionController: DefinitionsController;
  let definitionService: DefinitionsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DefinitionsController],
      providers: [DefinitionsService],
    }).compile();

    definitionController = app.get<DefinitionsController>(DefinitionsController);
    definitionService = app.get<DefinitionsService>(DefinitionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getDefinition', () => {
    it('should return a definition', async () => {
      const definition = { name: 'definition1' };
      jest.spyOn(definitionService, 'getDefinition').mockImplementation(async () => definition);
      const response = await definitionController.getDefinition('definition1');
      expect(response).toEqual(definition);
    });
    it('should throw an error if appService.getDefinitions throws', async () => {
      const error = new Error('default error');
      jest.spyOn(definitionService, 'getDefinition').mockImplementation(async () => { throw error; });
      expect(definitionController.getDefinition('definition1')).rejects.toBe(error);
    });
  });

  describe('getDefinitions', () => {
    it('should return all definitions', async () => {
      const definitions = [{ name: 'definition1' }, { name: 'definition2' }];
      jest.spyOn(definitionService, 'getDefinitions').mockImplementation(async () => definitions);
      expect(definitionController.getDefinitions()).resolves.toBe(definitions);
    });
    it('should throw an error if appService.getDefinitions throws', async () => {
      const error = new Error('default error');
      jest.spyOn(definitionService, 'getDefinitions').mockImplementation(async () => { throw error; });
      expect(definitionController.getDefinitions()).rejects.toBe(error);
    });
  });

  describe('postDefinitions', () => {
    it('should insert a definition', async () => {
      const expectedResponse = undefined;
      const definition: DefinitionDto = { name: 'definition1', questions: [] };
      jest.spyOn(definitionService, 'insertDefinition').mockImplementation(async () => expectedResponse);
      const response = await definitionController.postDefinition(definition, 'name');
      expect(response).toBe(expectedResponse);
    });
  });

  describe('deleteDefinitions', () => {
    it('should delete a definition', async () => {
      const expectedResponse = undefined;
      jest.spyOn(definitionService, 'removeDefinition').mockImplementation(async () => expectedResponse);
      const response = await definitionController.deleteDefinition('name');
      expect(response).toBe(expectedResponse);
    });
  });

  describe('putDefinitions', () => {
    it('should update a definition', async () => {
      const expectedResponse = undefined;
      const definition: DefinitionDto = { name: 'definition1', questions: [] };
      jest.spyOn(definitionService, 'updateDefinition').mockImplementation(async () => undefined);
      const response = await definitionController.putDefinition('name', definition);
      expect(response).toBe(expectedResponse);
    });
  });
});
