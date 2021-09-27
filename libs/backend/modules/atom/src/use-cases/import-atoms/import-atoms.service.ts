import { UseCasePort } from '@codelab/backend/abstract/core'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { ImportApiService } from '@codelab/backend/modules/type'
import { AtomType, User } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { omit, pick } from 'lodash'
import { CreateAtomService } from '../create-atom'
import { CreateAtomRequest } from '../create-atom/create-atom.request'
import { TestGetExport__AtomsFragment } from '../export-atoms/get-export-atoms.api.graphql.gen'
import { GetAtomService } from '../get-atom'
import { UpdateAtomService } from '../update-atom'
import { ImportAtomsRequest } from './import-atoms.request'

/**
 * This is the entry point to importing all atom related data. This function will call a basic seeder to seed all default data that belongs to the platform.
 *
 * The calls are idempotent
 *
 */
@Injectable()
export class ImportAtomsService
  implements UseCasePort<ImportAtomsRequest, void>
{
  constructor(
    private getAtomService: GetAtomService,
    private createAtomService: CreateAtomService,
    private importApiService: ImportApiService,
    private updateAtomService: UpdateAtomService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async execute(request: ImportAtomsRequest): Promise<void> {
    const {
      input: { payload },
      currentUser,
    } = request

    const atoms = JSON.parse(payload)

    await this.createAtoms(atoms ?? [], currentUser)
  }

  private async createAtoms(
    atoms: Array<TestGetExport__AtomsFragment>,
    currentUser: User,
  ) {
    return await Promise.all(
      atoms.map(async (atom) => {
        this.logger.debug(
          omit(atom.api, 'typeGraph'),
          `Seeding Atom: ${atom.name}`,
        )

        // Seed api
        const { id } = await this.importApiService.execute({
          input: {
            typeGraph: atom.api.typeGraph,
            api: atom.api.id,
          },
          currentUser,
        })

        // Seed atom
        const createdAtomId = await this.upsertAtom({
          input: {
            type: atom.type,
            name: atom.name,
            api: id,
          },
          currentUser,
        })

        this.logger.debug(
          pick(atom, ['name', 'type']),
          createdAtomId ? 'Atom Created' : 'Atom Exists',
        )
      }),
    )
  }

  /**
   * Checks if an Atom with the same AtomType exists, if not - creates it
   *
   * Returns the id if created
   */
  private async upsertAtom({
    input,
    currentUser,
  }: CreateAtomRequest): Promise<string | null> {
    const atom = await this.getAtomService.execute({
      where: { type: input.type },
    })

    if (!atom) {
      const { id } = await this.createAtomService.execute({
        input,
        currentUser,
      })

      return id
    }

    // We don't update api here
    await this.updateAtomService.execute({
      id: atom.uid,
      data: {
        name: input.name,
        type: atom.atomType as AtomType,
      },
    })

    return atom.uid
  }
}
