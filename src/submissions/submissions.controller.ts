import {
  Controller, Post, Body, HttpCode,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('/submissions')
export default class AppController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('/')
  @HttpCode(200)
  postSubmission(@Body() doc) {
    return this.submissionsService.insertSubmission(doc);
  }
}
