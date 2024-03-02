import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { IAtomType } from '../atom'

/**
 * This allows for a shortened object to be specified as input. Good for seeding data in cases where the input is manually specified (such as Cypress)
 */
export interface ICreateElementData {
  atom?: IAtomType
  name: string
  parentElement: string
  propsData?: object
}
