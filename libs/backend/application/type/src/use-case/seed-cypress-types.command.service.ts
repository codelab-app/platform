/* eslint-disable @nx/enforce-module-boundaries */
import { TypeFactory } from '@codelab/backend/domain/type'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedCypressTypesCommand {}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedCypressTypesCommand)
export class SeedCypressTypesHandler {
  constructor(private typeFactory: TypeFactory) {}

  async execute() {
    /**
     * Create the types
     */
    const types = await Promise.all(
      [].map((typeData) => {
        return this.typeFactory.save(typeData)
      }),
    )
  }
}
