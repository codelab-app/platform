import type { OnModuleInit } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { CommandService } from './command.service'

@Module({
  exports: [CommandService],
  providers: [CommandService],
})
export class CommandModule implements OnModuleInit {
  constructor(private readonly commandService: CommandService) {}

  onModuleInit() {
    console.log('init')
    // this.commandService.init()
  }
}
