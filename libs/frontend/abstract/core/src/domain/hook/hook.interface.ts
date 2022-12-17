import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IProp } from '../prop'

export interface IHook {
  id: string
  type: IAtomType
  config: IProp
}
