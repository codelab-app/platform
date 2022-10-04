import { IAtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import { AtomsRecord } from '../types'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const codelabAtoms: AtomsRecord = {
  [IAtomType.TextList]: dynamic(() =>
    import('@codelab/frontend/platform/atoms').then((mod) => mod.TextList),
  ),
  [IAtomType.Text]: dynamic(() =>
    import('@codelab/frontend/platform/atoms').then((mod) => mod.Text),
  ),
  [IAtomType.Script]: dynamic(() =>
    import('@codelab/frontend/platform/atoms').then((mod) => mod.CodelabScript),
  ),
  // [AtomType.State]: dynamic(
  //   () =>
  //     import('@codelab/frontend/view/components').then(
  //       (mod) => mod.State,
  //     ) as any,
  // ),
}
