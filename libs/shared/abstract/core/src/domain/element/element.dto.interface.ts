import { Nullable } from '@codelab/shared/abstract/types'
import {
  ElementFragment,
  ElementGraphFragment,
} from './element.fragment.graphql.gen'

export interface ICreateElementDTO {
  name?: Nullable<string>
  order?: number
  instanceOfComponentId?: Nullable<string>
  atomId?: Nullable<string>
  parentElementId?: string
  css?: string
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
