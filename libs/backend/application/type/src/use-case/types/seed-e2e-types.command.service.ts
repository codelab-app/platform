import { TypeFactory } from '@codelab/backend-domain-type'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedE2eTypesCommand {}

/**
 * Used as endpoint for creating E2e data
 */
@CommandHandler(SeedE2eTypesCommand)
export class SeedE2eTypesHandler {
  constructor(private typeFactory: TypeFactory) {}

  async execute() {
    /**
     * Create the types
     */
    // return this.typeFactory.save(type)
  }
}
