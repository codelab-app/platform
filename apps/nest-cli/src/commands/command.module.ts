import { ImportAdminDataService } from '@codelab/backend/application/admin'
import { ImportService } from '@codelab/backend/infra/adapter/cli'
import { BullModule } from '@nestjs/bull'
import type { OnModuleInit } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { CommandService } from './command.service'

@Module({
  exports: [CommandService],
  imports: [
    BullModule.registerQueue({
      name: 'import-admin-data',
    }),
  ],
  providers: [CommandService, ImportService, ImportAdminDataService],
})
export class CommandModule implements OnModuleInit {
  constructor(private readonly commandService: CommandService) {}

  onModuleInit() {
    this.commandService.exec()
  }
}
