import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  findOne, getAll, insert, update, remove,
} from '../common/database.service';

// eslint-disable-next-line import/extensions
import config from '../config';

const db = config.database.definitions;
@Injectable()
export default class DefinitionsService {
  async getDefinition(name: string) {
    const match = await findOne(db, name);
    if (match == null) throw new HttpException('definition not found', HttpStatus.NOT_FOUND);
    return match;
  }

  async getDefinitions() {
    return getAll(db);
  }

  async insertDefinition(definition) {
    return insert(db, definition);
  }

  async updateDefinition(name, definition) {
    await update(db, name, definition);
  }

  async removeDefinition(name) {
    await remove(db, name);
  }
}
