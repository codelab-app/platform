import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import { logSection } from '@codelab/shared/utils'

export class ImportAtomsService extends IUseCase<Array<IAtomDTO>, void> {
  atomRepository: AtomRepository = new AtomRepository()

  async _execute(atoms: Array<IAtomDTO>) {
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
