import { IAtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import { AtomsRecord } from '../types'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const codelabAtoms: AtomsRecord = {
  [IAtomType.TextList]: dynamic(
    () =>
      import('@codelab/frontend/view/components').then(
        (mod) => mod.TextList,
      ) as any,
  ),
  [IAtomType.Text]: dynamic(
    () =>
      import('@codelab/frontend/view/components').then(
        (mod) => mod.Text,
      ) as any,
  ),
  // [AtomType.State]: dynamic(
  //   () =>
  //     import('@codelab/frontend/view/components').then(
  //       (mod) => mod.State,
  //     ) as any,
  // ),
}
