import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { Global, Injectable, OnModuleInit } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

/**
 * Allow us to subscribe to the command bus and log the commands
 */
@Global()
@Injectable()
export class CommandBusSubscription implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: PinoLoggerService,
  ) {}

  onModuleInit() {
    /**
     * Because CommandBus extends Observable, you can subscribe to it.
     * Each time a command is published, this subscription emits.
     * You CANNOT intercept or alter the command; you can only observe it.
     */
    this.commandBus.subscribe((command) => {
      // command.constructor.name gives the class name (e.g., MyCommand)
      const commandName = command.constructor.name

      this.logger.log('Executing command', {
        context: commandName,
        data: command,
      })
    })
  }
}
