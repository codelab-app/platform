import type { IApp } from '@codelab/shared/abstract/core'
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Request as ExpressRequest } from 'express'
import { ExportAppsCommand, SeedCypressAppCommand } from './use-case'

@Controller('data/app')
export class AppApplicationController {
  constructor(private commandBus: CommandBus) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('seed-cypress-app')
  async seedApp() {
    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('export')
  async exportApp(@Request() req: ExpressRequest) {
    return this.commandBus.execute<SeedCypressAppCommand, IApp>(
      new ExportAppsCommand({ id: req.query.id as string }),
    )
  }
}
