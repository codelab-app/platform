import type { IUserDto } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { UserRepository } from '@codelab/backend/domain/user'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedUserCommand {
  constructor(public readonly user: IUserDto) {}
}

@CommandHandler(SeedUserCommand)
export class SeedUserHandler implements ICommandHandler<SeedUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: SeedUserCommand) {
    const { user } = command

    await this.userRepository.add(user)
  }
}
