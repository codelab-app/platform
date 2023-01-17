import { IAtomType } from '@codelab/shared/abstract/core'
import { ReactTag } from '../tag/react-tags.data'
import type { AtomSeedData } from './antd-atom.data'

/**
 * Assign all data that is related to react atoms here
 */
export const reactAtomData: Partial<Record<IAtomType, AtomSeedData>> = {
  [IAtomType.ReactFragment]: {
    file: 'ReactFragment',
    tag: ReactTag.ReactFragment,
  },
}
