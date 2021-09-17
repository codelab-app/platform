import {
  CreateAtomInput,
  CreateAtomService,
  GetAtomInput,
  GetAtomService,
} from '@codelab/backend/modules/atom'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { Injectable, Logger } from '@nestjs/common'

/**
 * Handle seeding of atoms
 */
@Injectable()
export class AtomSeeder {
  constructor(
    private createAtomService: CreateAtomService,
    private getAtomService: GetAtomService,
  ) {}

  /**
   * Checks if an Atom with the same AtomType exists, if not - creates it
   * Returns the id in both cases
   */
  async seedAtomIfMissing(atom: CreateAtomInput): Promise<string> {
    return createIfMissing(
      () =>
        this.getAtom({ where: { type: atom.type } }).then(
          (_atom) => _atom?.uid,
        ),
      () => this.createAtom(atom),
    )
  }

  async getAtom(input: GetAtomInput) {
    return await this.getAtomService.execute(input)
  }

  private async createAtom(input: CreateAtomInput) {
    const createResponse = await this.createAtomService.execute(input)

    if (!createResponse?.id) {
      throw new Error(`Something went wrong while creating atom ${input.type}`)
    }

    Logger.debug(`Created atom ${input.type}`)

    return createResponse.id
  }
}
