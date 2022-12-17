import type { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import type { IAtomImport } from './atom.interface'

export interface ApiData {
  fields: Array<ICreateFieldDTO>
  atom: IAtomImport
}
