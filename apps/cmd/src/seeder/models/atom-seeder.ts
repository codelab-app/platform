import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import {
  CreateAtomRequest,
  CreateAtomService,
  CreateAtomsService,
  GetAtomInput,
  GetAtomService,
  GetAtomsService,
} from '@codelab/backend/modules/atom'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { AtomType, IUser, Role } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Inject, Injectable, Logger } from '@nestjs/common'

/**
 * Handle seeding of atoms
 */
@Injectable()
export class AtomSeeder {
  constructor(
    private createAtomService: CreateAtomService,
    private getAtomsService: GetAtomsService,
    private createAtomsService: CreateAtomsService,
    private getAtomService: GetAtomService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async seedAtomsIfMissing(types: Array<AtomType>) {
    const found = await this.getAtomsService.execute({ where: { types } })
    const foundTypes = new Set(found.map((f) => f.type))
    const missingTypes = types.filter((t) => !foundTypes.has(t))

    const currentUser: IUser = {
      id: '0x01',
      auth0Id: '0x01',
      roles: [Role.Admin],
    }

    const created = await this.createAtomsService.execute({
      input: {
        atoms: missingTypes.map((type) => ({
          type,
          name: pascalCaseToWords(type),
        })),
      },
      currentUser,
    })

    return this.getAtomsService.execute({
      where: { ids: created.map((c) => c.id) },
    })
  }

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
