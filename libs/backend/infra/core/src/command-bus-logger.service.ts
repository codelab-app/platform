import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { Global, Injectable, OnModuleInit } from '@nestjs/common'
import { CommandBus, ICommand } from '@nestjs/cqrs'
import { startSpan } from '@sentry/nestjs'

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
    this.commandBus.subscribe({
      error: (error: Error) => {
        this.logger.error('Error executing command', { error })
      },
      next: (command: ICommand) => {
        const commandName = command.constructor.name

        this.logger.debug('Command executed...', {
          context: commandName,
        })
      },
    })
  }
}
