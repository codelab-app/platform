import type { IAtomRendererRecord } from '@codelab/frontend/abstract/core'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const codelabAtoms: IAtomRendererRecord = {
  [IAtomType.GridLayout]: dynamicLoader(() =>
    import('libs/frontend/application/atom/src').then((mod) => mod.GridLayout),
  ),
  [IAtomType.TextList]: dynamicLoader(() =>
    import('libs/frontend/application/atom/src').then((mod) => mod.TextList),
  ),
  [IAtomType.Text]: dynamicLoader(() =>
    import('libs/frontend/application/atom/src').then((mod) => mod.Text),
  ),
  [IAtomType.Script]: dynamicLoader(() =>
    import('libs/frontend/application/atom/src').then(
      (mod) => mod.CodelabScript,
    ),
  ),
  // [AtomType.State]: dynamic(
  //   () =>
  //     import('@codelab/frontend/presentation/view').then(
  //       (mod) => mod.State,
  //     ) as any,
  // ),
}
