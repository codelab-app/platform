import { DatabaseService } from '@codelab/backend/application/service'
import { Body, Controller, Post } from '@nestjs/common'

export class ResetDataDto {
  close?: false
}

@Controller('admin')
export class AdminController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('reset')
  async reset(@Body() resetDataDto: ResetDataDto) {
    await this.databaseService.reset(resetDataDto.close)

    return {
      message: 'Admin data reset success',
    }
  }
}
