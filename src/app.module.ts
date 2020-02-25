import { Module } from '@nestjs/common';
import AppController from './app.controller';
import AppService from './app.service';
import DefinitionsModule from './definitions/definitions.module';
import SubmissionsModule from './submissions/submissions.module';

@Module({
  imports: [DefinitionsModule, SubmissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
