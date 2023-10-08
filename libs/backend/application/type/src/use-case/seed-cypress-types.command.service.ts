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
    // return this.typeFactory.save(type)
  }
}
