import { UseCasePort } from '@codelab/backend/abstract/core'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { ImportApiService } from '@codelab/backend/modules/type'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { GetExport__AtomsFragment } from '@codelab/shared/codegen/graphql'
import { Inject, Injectable } from '@nestjs/common'
import { CreateAtomInput, CreateAtomService } from '../create-atom'
import { GetAtomService } from '../get-atom'
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
        this.logger.log(atom)

        // Seed api
        const { id } = await this.importApiService.execute({
          typeGraph: atom.api.typeGraph,
          api: atom.api.id,
        })

        // Seed atom
        await this.seedAtomIfMissing({
          type: atom.type,
          name: atom.name,
          api: id,
        })
      }),
    )
  }

  /**
   * Checks if an Atom with the same AtomType exists, if not - creates it
   * Returns the id in both cases
   */
  private async seedAtomIfMissing(atom: CreateAtomInput): Promise<string> {
    return createIfMissing(
      () =>
        this.getAtomService
          .execute({ where: { type: atom.type } })
          .then((_atom) => _atom?.uid),
      () => this.createAtomService.execute(atom).then((r) => r.id),
    )
  }
}
