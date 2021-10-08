import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import {
  CreateAtomRequest,
  CreateAtomService,
  GetAtomInput,
  GetAtomService,
} from '@codelab/backend/modules/atom'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { Inject, Injectable, Logger } from '@nestjs/common'

/**
 * Handle seeding of atoms
 */
@Injectable()
export class AtomSeeder {
  constructor(
    private createAtomService: CreateAtomService,
    private getAtomService: GetAtomService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  /**
   * Checks if an Atom with the same AtomType exists, if not - creates it
   * Returns the id in both cases
   */
  async seedAtomIfMissing(request: CreateAtomRequest): Promise<string> {
    this.logger.log(request, 'Seeding atom...')

    return await createIfMissing(
      () => {
        const found = this.getAtom({
          where: { type: request.input.type },
        }).then((_atom) => _atom?.id)

        this.logger.log('Found')

        return found
      },
      () => {
        this.logger.log('Not found! Creating new atom...')

        return this.createAtom(request)
      },
    )
  }

  async getAtom(input: GetAtomInput) {
    return await this.getAtomService.execute(input)
  }

  private async createAtom(request: CreateAtomRequest) {
    const createResponse = await this.createAtomService.execute(request)

    if (!createResponse?.id) {
      throw new Error(
        `Something went wrong while creating atom ${request.input.type}`,
      )
    }

    Logger.debug(`Created atom ${request.input.type}`)

    return createResponse.id
  }
}
