import {
  Controller, Param, Post, Body, HttpCode,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('/submissions')
export default class AppController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('/:name')
  @HttpCode(200)
  postSubmission(@Body() doc, @Param('name') name) {
    return this.submissionsService.insertSubmission(name, doc);
  }
}
