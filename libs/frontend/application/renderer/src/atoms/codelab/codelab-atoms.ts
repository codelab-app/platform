import type { IAtomRendererRecord } from '@codelab/frontend-abstract-domain'

import { TextEditor } from '@codelab/frontend-presentation-components-lexical'
import { dynamicLoader } from '@codelab/frontend-shared-utils'
import { IAtomType } from '@codelab/shared-abstract-core'

// Custom atom components
// Note: some of those are obsolete and replaced by hooks (or mobx platform when implemented)
export const codelabAtoms: IAtomRendererRecord = {
  [IAtomType.GridLayout]: dynamicLoader(() =>
    import(
      '@codelab/frontend-application-atom/components/custom/grid-layout'
    ).then((mod) => mod.GridLayout),
  ),
  [IAtomType.Script]: dynamicLoader(() =>
    import(
      '@codelab/frontend-application-atom/components/custom/codelab-script'
    ).then((mod) => mod.CodelabScript),
  ),
  [IAtomType.Text]: TextEditor,
  [IAtomType.TextList]: dynamicLoader(() =>
    import(
      '@codelab/frontend-application-atom/components/custom/text-list'
    ).then((mod) => mod.TextList),
  ),
}
