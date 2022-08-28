import { IAtomType } from '@codelab/shared/abstract/core'
import { AtomRequiredProps } from '../types'

export const muiAtomRequiredProps: AtomRequiredProps = {
  [IAtomType.MuiModal]: ['children', 'open'],
}
