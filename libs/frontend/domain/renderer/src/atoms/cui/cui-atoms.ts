import type { IAtomRendererRecord } from '@codelab/frontend/abstract/domain'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const cuiAtoms: IAtomRendererRecord = {
  [IAtomType.GridLayout]: dynamicLoader(() =>
    import('@codelab/frontend/presentation/renderer').then(
      (mod) => mod.GridLayout,
    ),
  ),
  [IAtomType.TextList]: dynamicLoader(() =>
    import('@codelab/frontend/presentation/renderer').then(
      (mod) => mod.TextList,
    ),
  ),
  [IAtomType.Text]: dynamicLoader(() =>
    import('@codelab/frontend/presentation/renderer').then((mod) => mod.Text),
  ),
  [IAtomType.Script]: dynamicLoader(() =>
    import('@codelab/frontend/presentation/renderer').then(
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
