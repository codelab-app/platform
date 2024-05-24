import type { IAtomRendererRecord } from '@codelab/frontend/abstract/domain'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import { TextEditor } from '@codelab/frontend-presentation-view/components'
import { IAtomType } from '@codelab/shared/abstract/core'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const codelabAtoms: IAtomRendererRecord = {
  [IAtomType.GridLayout]: dynamicLoader(() =>
    import(
      '@codelab/frontend-application-atom/components/custom/grid-layout'
    ).then((mod) => mod.GridLayout),
  ),
  [IAtomType.TextList]: dynamicLoader(() =>
    import(
      '@codelab/frontend-application-atom/components/custom/textList'
    ).then((mod) => mod.TextList),
  ),
  [IAtomType.Text]: TextEditor,
  [IAtomType.Script]: dynamicLoader(() =>
    import(
      '@codelab/frontend-application-atom/components/custom/codelab-script'
    ).then((mod) => mod.CodelabScript),
  ),
}
