import { Injectable } from '@nestjs/common';
import { getOne, getAll, insert, update, remove } from './database.service';
@Injectable()
export default class AppService {
  async getDefinition(id: string) {
    return getOne('definitions', id);
  }
  
  async getDefinitions() {
    return getAll('definitions');
  }
  
  async insertDefinition(name, definition) {
    return insert('definitions', name, definition);
  }
  
  async updateDefinition(name, definition) {
    return update('definitions', name, definition);
  }
  
  async removeDefinition(name) {
    return remove('definitions', name);
  }
}
