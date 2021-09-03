import { UseCasePort } from '@codelab/backend/abstract/core'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { ImportApiService } from '@codelab/backend/modules/type'
import { GetExport__AtomsFragment } from '@codelab/shared/codegen/graphql'
import { Inject, Injectable } from '@nestjs/common'
import { omit, pick } from 'lodash'
import { AtomType } from '../../domain/atom-type.model'
import { CreateAtomInput, CreateAtomService } from '../create-atom'
import { GetAtomService } from '../get-atom'
import { UpdateAtomService } from '../update-atom'
import { ImportAtomsInput } from './import-atoms.input'

/**
 * This is the entry point to importing all atom related data. This function will call a basic seeder to seed all default data that belongs to the platform.
 *
 * The calls are idempotent
 */
@Injectable()
export class ImportAtomsService implements UseCasePort<ImportAtomsInput, void> {
  constructor(
    private getAtomService: GetAtomService,
    private createAtomService: CreateAtomService,
    private importApiService: ImportApiService,
    private updateAtomService: UpdateAtomService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async execute(request: ImportAtomsInput): Promise<void> {
    const { payload } = request
    const atoms = JSON.parse(payload)

    await this.seedAtoms(atoms ?? [])
  }

  private async seedAtoms(atoms: Array<GetExport__AtomsFragment>) {
    return Promise.all(
      atoms.map(async (atom) => {
        this.logger.log(
          omit(atom.api, 'typeGraph'),
          `Seeding Atom: ${atom.name}`,
        )

        // Seed api
        const { id } = await this.importApiService.execute({
          typeGraph: atom.api.typeGraph,
          api: atom.api.id,
        })

        // Seed atom
        const createdAtomId = await this.upsertAtom({
          type: atom.type,
          name: atom.name,
          api: id,
        })

        this.logger.log(
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
  private async upsertAtom(atomInput: CreateAtomInput): Promise<string | null> {
    const atom = await this.getAtomService.execute({
      where: { type: atomInput.type },
    })

    if (!atom) {
      const { id } = await this.createAtomService.execute(atomInput)

      return id
    }

    // We don't update api here
    await this.updateAtomService.execute({
      id: atom.uid,
      data: {
        name: atomInput.name,
        type: atom.atomType as AtomType,
      },
    })

    return atom.uid
  }
}
