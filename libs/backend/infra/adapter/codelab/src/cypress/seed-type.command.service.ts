/* eslint-disable @nx/enforce-module-boundaries */
import { TypeFactory } from '@codelab/backend/domain/type'
import type { IAuth0Owner, IAuth0User } from '@codelab/shared/abstract/core'
import { createTypesData } from '@codelab/shared/data/test'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedTypeCommand implements IAuth0Owner {
  constructor(public owner: IAuth0User) {}
}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedTypeCommand)
export class SeedTypeHandler {
  constructor(private typeFactory: TypeFactory) {}

  async execute(command: SeedTypeCommand) {
    const { owner } = command
    const typesData = createTypesData(owner)

    /**
     * Create the types
     */
    const types = await Promise.all(
      typesData.map((typeData) => {
        return this.typeFactory.save(typeData)
      }),
    )
  }
}
