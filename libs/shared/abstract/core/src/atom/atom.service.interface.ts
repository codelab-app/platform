import { ObjectMap } from 'mobx-keystone'
import { IAtom } from './atom.interface'

export interface IAtomService {
  atoms: ObjectMap<IAtom>
}
