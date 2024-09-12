import type { IAtomRendererRecord } from '@codelab/frontend/abstract/domain'
import { IAtomType } from '@codelab/shared/abstract/core'

export const reactAtoms: IAtomRendererRecord = {
  [IAtomType.ReactFragment]: React.Fragment,
}
