import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IProp } from '../prop'

export interface IHook {
  config: IProp
  id: string
  type: IAtomType
}
