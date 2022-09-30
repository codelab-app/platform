import { ICreateFieldDTO } from '../domain/type'
import { IAtomImport } from './atom.interface'

/**
 * The final output shape of the parser
 */
export type FieldDataByAtom = Map<IAtomImport, Array<ICreateFieldDTO>>

/**
 * Data output of parser service
 */
export interface AntDesignFieldsByFile {
  [file: string]: Array<AntdDesignField>
}

/**
 * The data format of the CSV row itself
 */
export interface AntdDesignField {
  property: string
  description: string
  type: string
  default: string
  version: string
  isEnum: boolean
}
