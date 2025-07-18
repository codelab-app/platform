import type { ICommandHandler } from '@nestjs/cqrs'

import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import { systemTypesData } from '@codelab/shared-data-seed'
import { CommandHandler } from '@nestjs/cqrs'

import { TypeSeederService } from '../../service'

export class SeedSystemTypesCommand {}

/**
 * Seed generates new ID's, we use import
 *
 * @deprecated Only used initially to create the json data
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
    const types = systemTypesData(this.authDomainService.currentUser)

    return this.typeSeederService.seedTypes(types)
  }
}
