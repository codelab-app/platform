import { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import { IAtomImport } from './atom.interface'

export interface ApiData {
  fields: Array<ICreateFieldDTO>
  atom: IAtomImport
}
