import { IAtomType } from '../atom'
import { IProp } from '../prop'

export interface IHook {
  id: string
  type: IAtomType
  config: IProp
}
