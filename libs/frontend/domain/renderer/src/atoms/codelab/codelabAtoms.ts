import { IAtomType } from '@codelab/shared/abstract/core'
import { dynamicLoader } from '../dynamicLoader'
import { AtomsRecord } from '../types'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const codelabAtoms: AtomsRecord = {
  [IAtomType.TextList]: dynamicLoader(
    import('@codelab/frontend/platform/atoms').then((mod) => mod.TextList),
  ),
  [IAtomType.Text]: dynamicLoader(
    import('@codelab/frontend/platform/atoms').then((mod) => mod.Text),
  ),
  [IAtomType.Script]: dynamicLoader(
    import('@codelab/frontend/platform/atoms').then((mod) => mod.CodelabScript),
  ),
  // [AtomType.State]: dynamic(
  //   () =>
  //     import('@codelab/frontend/view/components').then(
  //       (mod) => mod.State,
  //     ) as any,
  // ),
}
