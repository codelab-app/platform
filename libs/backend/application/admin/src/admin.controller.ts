import { DatabaseService } from '@codelab/backend/application/service'
import { Neo4jService } from '@codelab/backend/infra/adapter/neo4j'
import { Stage } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsEnum } from 'class-validator'

export class ResetDataDto {
  close?: false
}

@Controller('admin')
export class AdminController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('reset')
  async reset(@Body() resetDataDto: ResetDataDto) {
    return this.databaseService.reset(resetDataDto.close)
  }
}
