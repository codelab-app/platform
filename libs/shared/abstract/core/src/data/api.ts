import { ICreateFieldDTO } from '../domain/type'
import { IAtomImport } from './atom.interface'

export interface ApiData {
  fields: Array<ICreateFieldDTO>
  atom: IAtomImport
}
