import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { IPropData } from '../prop'
import { ElementFragment } from './element.fragment.graphql.gen'

export interface ICreateElementDTO {
  id?: string
  name?: Nullable<string>
  renderComponentTypeId?: Nullable<string>
  atomId?: Nullable<string>
  parentElementId?: string
  preRenderActionId?: Nullish<string>
  postRenderActionId?: Nullish<string>
  customCss?: Nullish<string>
  guiCss?: Nullish<string>
  propsData?: string
  prevSiblingId?: Nullable<string>
}

export interface IUpdateElementDTO {
  name?: Nullable<string>
  renderComponentTypeId?: Nullable<string>
  atomId?: Nullable<string>
  renderForEachPropKey?: Nullable<string>
  renderIfPropKey?: Nullable<string>
  customCss?: Nullable<string>
  guiCss?: Nullable<string>
  props?: Nullable<IPropData>
  preRenderActionId?: Nullish<string>
  postRenderActionId?: Nullish<string>
}

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementDTO = Pick<
  IUpdateElementDTO,
  | 'atomId'
  | 'name'
  | 'renderIfPropKey'
  | 'renderForEachPropKey'
  | 'renderComponentTypeId'
  | 'preRenderActionId'
  | 'postRenderActionId'
>

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export type IElementDTO = ElementFragment

export type IElementExport = Pick<
  OGM_TYPES.Element,
  'id' | 'name' | 'parent' | 'renderAtomType'
>
