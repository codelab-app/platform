import type { AtomSeedRecord } from '@codelab/backend/abstract/core'
import { ReactTag } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'

/**
 * Assign all data that is related to react atoms here
 */
export const reactAtomData: AtomSeedRecord = {
  [IAtomType.ReactFragment]: {
    file: 'ReactFragment',
    tag: ReactTag.ReactFragment,
  },
}
