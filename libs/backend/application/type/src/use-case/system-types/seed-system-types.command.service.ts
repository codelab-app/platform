import type { ICommandHandler } from '@nestjs/cqrs'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CommandHandler } from '@nestjs/cqrs'

import { systemTypesData } from '../../data'
import { TypeSeederService } from '../../service'

export class SeedSystemTypesCommand {}

/**
 * Seed generates new ID's, we use import
 */
@CommandHandler(SeedSystemTypesCommand)
export class SeedSystemTypesHandler
  implements ICommandHandler<SeedSystemTypesCommand, void>
{
  constructor(
    private typeSeederService: TypeSeederService,
    private authDomainService: AuthDomainService,
  ) {}

  async execute() {
    const types = Object.values(
      systemTypesData(this.authDomainService.currentUser),
    )

    return this.typeSeederService.seedTypes(types)
  }
}
