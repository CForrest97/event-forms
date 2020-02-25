import * as databaseService from '../common/database.service';
import DefinitionsService from './definitions.service';

describe('DefinitionsService', () => {
  const definitionService = new DefinitionsService();

  const getAllMock = jest.spyOn(databaseService, 'getAll').mockImplementation(async () => null);
  const getOneMock = jest.spyOn(databaseService, 'getOne').mockImplementation(async () => null);
  const insertMock = jest.spyOn(databaseService, 'insert').mockImplementation(async () => null);
  const updateMock = jest.spyOn(databaseService, 'update').mockImplementation(async () => null);
  const removeMock = jest.spyOn(databaseService, 'remove').mockImplementation(async () => null);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getDefinition', () => {
    it('should call get', async () => {
      await definitionService.getDefinition('1');
      expect(getOneMock).toBeCalledTimes(1);
      expect(getOneMock).toBeCalledWith('definitions', '1');
    });
  });
  describe('getAllDefinition', () => {
    it('should call getAll', async () => {
      await definitionService.getDefinitions();
      expect(getAllMock).toBeCalledTimes(1);
      expect(getAllMock).toBeCalledWith('definitions');
    });
  });
  describe('insertDefinition', () => {
    it('should call insertMock', async () => {
      await definitionService.insertDefinition('name', { name: 'abc' });
      expect(insertMock).toBeCalledTimes(1);
      expect(insertMock).toBeCalledWith('definitions', 'name', { name: 'abc' });
    });
  });
  describe('updateDefinition', () => {
    it('should call updateMock', async () => {
      await definitionService.updateDefinition('name', { name: 'abc' });
      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).toBeCalledWith('definitions', 'name', { name: 'abc' });
    });
  });
  describe('removeDefinition', () => {
    it('should call removeMock', async () => {
      await definitionService.removeDefinition('name');
      expect(removeMock).toBeCalledTimes(1);
      expect(removeMock).toBeCalledWith('definitions', 'name');
    });
  });
});
