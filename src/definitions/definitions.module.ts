import { Module } from '@nestjs/common';
import DefinitionsController from './definitions.controller';
import DefinitionsService from './definitions.service';

@Module({
  imports: [],
  controllers: [DefinitionsController],
  providers: [DefinitionsService],
})
export default class DefinitionsModule {}
