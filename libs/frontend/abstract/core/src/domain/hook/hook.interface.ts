import { IAtomType } from '@codelab/shared/abstract/core'
import { IProp } from '../prop'

export interface IHook {
  id: string
  type: IAtomType
  config: IProp
}
