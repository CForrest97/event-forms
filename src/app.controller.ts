import {
  Controller, Get, Delete, Param, Post, Body, Put,
} from '@nestjs/common';
import AppService from './app.service';

@Controller('/definitions')
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getDefinitions() {
    return this.appService.getDefinitions();
  }

  @Get('/:name')
  getDefinition(@Param('name') name) {
    return this.appService.getDefinition(name);
  }

  @Post('/:name')
  postDefinition(@Body() doc, @Param('name') name) {
    return this.appService.insertDefinition(name, doc);
  }

  @Delete('/:name')
  deleteDefinition(@Param('name') name) {
    return this.appService.removeDefinition(name);
  }

  @Put('/:name')
  putDefinition(@Body() doc, @Param('name') name) {
    return this.appService.updateDefinition(name, doc);
  }
}
