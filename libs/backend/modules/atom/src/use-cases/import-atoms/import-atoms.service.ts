import { UseCasePort } from '@codelab/backend/abstract/core'
import { createIfMissing } from '@codelab/backend/shared/utils'
import {
  CreateAtomInput,
  GetExport__AtomsFragment,
} from '@codelab/shared/codegen/graphql'
import { Injectable } from '@nestjs/common'
import { CreateAtomService } from '../create-atom'
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
  ) {}

  async execute(request: ImportAtomsInput): Promise<void> {
    const { payload } = request
    const data = JSON.parse(payload)
    const atoms = await this.seedAtoms(data ?? [])
    console.log(atoms)
  }

  private async seedAtoms(atoms: Array<GetExport__AtomsFragment>) {
    return Promise.all(
      atoms.map((atom) =>
        this.seedAtomIfMissing({
          type: atom.type,
          name: atom.name,
        }),
      ),
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
