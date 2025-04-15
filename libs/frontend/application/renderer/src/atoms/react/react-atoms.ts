import type { IAtomRendererRecord } from '@codelab/frontend-abstract-domain'

import { IAtomType } from '@codelab/shared-abstract-core'
import { Fragment } from 'react'

export const reactAtoms: IAtomRendererRecord = {
  [IAtomType.ReactFragment]: Fragment,
}
