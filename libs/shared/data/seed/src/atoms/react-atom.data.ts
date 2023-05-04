import type { IReactAtomRecords } from '@codelab/backend/abstract/core'
import { IReactCategoryTag } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'

/**
 * Assign all data that is related to react atoms here
 */
export const reactAtomData: IReactAtomRecords = {
  [IAtomType.ReactFragment]: {
    file: 'ReactFragment',
    tag: IReactCategoryTag.ReactFragment,
  },
}
