import type { ImportAtoms } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { logSection } from '@codelab/shared/utils'

export class ImportAtomsService extends IUseCase<ImportAtoms, void> {
  atomRepository: AtomRepository = new AtomRepository()

  async _execute({ atoms = [] }: ImportAtoms) {
    logSection('Importing Atoms')

    /**
     * Create all atoms but omit `suggestedChildren` and `requiredParents`, since those are required
     */
    await Promise.all(
      atoms.map(
        // Omit `suggestedChildren` and `requiredParents`, since they require all atoms to be added first
        async ({ suggestedChildren, requiredParents, ...atom }) =>
          await this.atomRepository.save(atom),
      ),
    )

    /**
     * Here we assign suggestedChildren and requiredParents, since all atoms must be created first
     */
    await Promise.all(
      atoms.map(async (atom) => await this.atomRepository.save(atom)),
    )
  }
}
