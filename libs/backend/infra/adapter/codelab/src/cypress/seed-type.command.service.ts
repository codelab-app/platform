/* eslint-disable @nx/enforce-module-boundaries */
import { TypeFactory } from '@codelab/backend/domain/type'
import { createTypesData } from '@codelab/shared/data/test'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedTypeCommand {}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedTypeCommand)
export class SeedTypeHandler {
  constructor(private typeFactory: TypeFactory) {}

  async execute() {
    const typesData = createTypesData()

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
