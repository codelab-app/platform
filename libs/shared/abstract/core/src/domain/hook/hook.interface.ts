import { AtomType } from '../atom'
import { IProp } from '../prop'

export interface IHook {
  id: string
  type: AtomType
  config: IProp
}
