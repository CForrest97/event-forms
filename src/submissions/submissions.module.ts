import { Module } from '@nestjs/common';
import SubmissionsController from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export default class AppModule {}
