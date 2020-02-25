import {
  Controller, Get, Delete, Param, Post, Body, Put,
} from '@nestjs/common';
import DefinitionsService from './definitions.service';
import DefinitionDto from './doc/DefinitionDto';

@Controller('/definitions')
export default class DefinitionsController {
  constructor(private readonly appService: DefinitionsService) {}

  @Get('/')
  getDefinitions() {
    return this.appService.getDefinitions();
  }

  @Get('/:name')
  getDefinition(@Param('name') name) {
    return this.appService.getDefinition(name);
  }

  @Post('/:name')
  postDefinition(@Body() doc: DefinitionDto, @Param('name') name) {
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
