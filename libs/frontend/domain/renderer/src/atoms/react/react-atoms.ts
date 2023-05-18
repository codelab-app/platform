import type { IAtomRendererRecord } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import React from 'react'

export const reactAtoms: IAtomRendererRecord = {
  [IAtomType.ReactFragment]: React.Fragment,
}
