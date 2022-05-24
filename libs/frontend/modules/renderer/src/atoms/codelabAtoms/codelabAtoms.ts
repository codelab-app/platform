import { IAtomType } from '@codelab/shared/abstract/core'
import { dynamicImport } from '../import'
import { AtomsRecord } from '../types'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const codelabAtoms: AtomsRecord = {
  [IAtomType.TextList]: dynamicImport(
    import('@codelab/frontend/platform/atoms'),
    (mod) => mod.TextList,
  ),
  [IAtomType.Text]: dynamicImport(
    import('@codelab/frontend/platform/atoms'),
    (mod) => mod.Text,
  ),
  // [AtomType.State]: dynamic(
  //   () =>
  //     import('@codelab/frontend/view/components').then(
  //       (mod) => mod.State,
  //     ) as any,
  // ),
}
