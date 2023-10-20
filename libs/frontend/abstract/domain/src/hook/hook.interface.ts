import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IPropModel } from '../prop'

export interface IHook {
  config: IPropModel
  id: string
  type: IAtomType
}
