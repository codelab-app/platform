import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend-domain-type'
import { type IAtomType } from '@codelab/shared-abstract-core'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class SeedEmptyApiCommand {
  constructor(public atoms: Array<IAtomType>) {}
}

/**
 * Seed empty API from atom names
 */
@CommandHandler(SeedEmptyApiCommand)
export class SeedEmptyApiHandler
  implements ICommandHandler<SeedEmptyApiCommand>
{
  constructor(
    private interfaceTypeRepository: InterfaceTypeRepository,
    private authDomainService: AuthDomainService,
  ) {}

  /**
   * Create empty interfaces from Ant Design atom name
   */
  async execute({ atoms }: SeedEmptyApiCommand) {
    const existingInterfaceTypes = new Map(
      (await this.interfaceTypeRepository.find()).map((interfaceType) => [
        interfaceType.name,
        interfaceType,
      ]),
    )

    await Promise.all(
      atoms.map(async (name) => {
        // Create empty api from atom name
        const { fields, ...interfaceType } = InterfaceType.createFromAtomName(
          name,
          this.authDomainService.currentUser,
        )

        // Search existing interface type
        const existingInterfaceType = existingInterfaceTypes.get(
          interfaceType.name,
        )

        // Keep same ID if exists
        if (existingInterfaceType) {
          interfaceType.id = existingInterfaceType.id
        }

        await this.interfaceTypeRepository.save({
          fields: [],
          ...interfaceType,
        })
      }),
    )
  }
}
