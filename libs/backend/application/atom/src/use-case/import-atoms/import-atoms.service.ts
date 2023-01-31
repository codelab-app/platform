import type { ImportAtoms } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { whereNullableNodeIds } from '@codelab/shared/domain/mapper'
import { logSection } from '@codelab/shared/utils'

export class ImportAtomsService extends IUseCase<ImportAtoms, void> {
  atomRepository: AtomRepository = new AtomRepository()

  async _execute({ atoms = [] }: ImportAtoms) {
    logSection('Importing Atoms')

    /**
     * Create all atoms but omit `allowedChildren`, since that is required
     */
    await Promise.all(
      atoms.map(
        // Omit `allowedChildren`, since it requires all atoms to be added first
        async ({ allowedChildren, ...atom }) =>
          await this.atomRepository.save(atom),
      ),
    )

    /**
     * Here we assign allowedChildren, since all atoms must be created first
     */
    await Promise.all(
      atoms.map(async (atom) => await this.atomRepository.save(atom)),
    )
  }
}
