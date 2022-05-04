import { IElementModel } from '@codelab/backend'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { AtomFragment } from '../atom/atom.fragment.graphql.gen'
import {
  ElementFragment,
  ElementGraphFragment,
} from './element.fragment.graphql.gen'

export interface ICreateElementDTO {
  id?: string
  name?: Nullable<string>
  order?: number
  instanceOfComponentId?: Nullable<string>
  atomId?: Nullable<string>
  parentElementId?: string
  css?: Nullish<string>
  propsData?: string
}

export type IUpdateElementDTO = {
  name: Nullable<string>
  instanceOfComponentId: Nullable<string>
  atomId: Nullable<string>
  renderForEachPropKey: Nullable<string>
  renderIfPropKey: Nullable<string>
}

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export type IElementDTO = ElementFragment

export type IElementGraphDTO = ElementGraphFragment

export type IElementExport = IElementModel
// {
//   id: string
//   name?: string | null
//   parentElement?: { id: string } | null
//   atom?: { id: string } | null
// }
