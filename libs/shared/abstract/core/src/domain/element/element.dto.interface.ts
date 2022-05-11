import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { IAuth0Id } from '../user'
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
  owner: IAuth0Id
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

export type IElementExport = Pick<
  OGM_TYPES.Element,
  'id' | 'name' | 'parentElement' | 'atom'
>
