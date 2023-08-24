import { DatabaseService } from '@codelab/backend/application/service'
import { Body, Controller, Get, Post } from '@nestjs/common'

export class ResetDataDto {
  close?: false
}

@Controller('admin')
export class AdminController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  index() {
    return 'index'
  }

  @Post('reset')
  async reset(@Body() resetDataDto: ResetDataDto) {
    return this.databaseService.reset(resetDataDto.close)
  }
}
