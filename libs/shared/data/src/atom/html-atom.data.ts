import { IAtomType } from '@codelab/shared/abstract/core'
import { HtmlTag } from '../tag/html-tags.data'
import type { AtomSeedData } from './antd-atom.data'

/**
 * Assign all data that is related to the atom here
 */
export const htmlAtomData: Partial<Record<IAtomType, AtomSeedData>> = {
  [IAtomType.ReactFragment]: {
    file: 'ReactFragment',
    tag: HtmlTag.ReactFragment,
  },
}
