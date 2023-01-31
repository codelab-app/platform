import { IAtomType } from '@codelab/shared/abstract/core'
import { ReactTag } from '@codelab/shared/data/seed'
import type { AtomSeedData } from '../atom-seed-data.interface'

/**
 * Assign all data that is related to react atoms here
 */
export const reactAtomData: Partial<Record<IAtomType, AtomSeedData>> = {
  [IAtomType.ReactFragment]: {
    file: 'ReactFragment',
    tag: ReactTag.ReactFragment,
  },
}
