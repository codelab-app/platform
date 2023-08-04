import type { IAtomRendererRecord } from '@codelab/frontend/abstract/core'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'

// Nextjs components
export const nextAtoms: IAtomRendererRecord = {
  [IAtomType.NextLink]: dynamicLoader(() => import('next/link')),
}
