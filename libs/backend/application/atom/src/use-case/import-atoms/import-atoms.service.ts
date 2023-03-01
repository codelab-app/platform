import type { ImportAtoms } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { logSection } from '@codelab/shared/utils'

export class ImportAtomsService extends IUseCase<ImportAtoms, void> {
  atomRepository: AtomRepository = new AtomRepository()

  async _execute({ atoms = [] }: ImportAtoms) {
    logSection('Importing Atoms')

    /**
     * Create all atoms but omit `suggestedChildren`, since that is required
     */
    await Promise.all(
      atoms.map(
        // Omit `suggestedChildren`, since it requires all atoms to be added first
        async ({ suggestedChildren, ...atom }) =>
          await this.atomRepository.save(atom),
      ),
    )

    /**
     * Here we assign suggestedChildren, since all atoms must be created first
     */
    await Promise.all(
      atoms.map(async (atom) => await this.atomRepository.save(atom)),
    )
  }
}
