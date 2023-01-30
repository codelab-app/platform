import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { IPropData } from '../prop'
import type { ElementFragment } from './element.fragment.graphql.gen'

export enum RenderTypeEnum {
  Component = 'component',
  Atom = 'atom',
}

export interface RenderType {
  id: string
  model: RenderTypeEnum
}

export interface ICreateElementDTO {
  id?: string
  slug: string
  name?: Nullable<string>
  renderType?: Nullable<RenderType>
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
  slug: string
  renderType?: Nullable<RenderType>
  renderForEachPropKey?: Nullable<string>
  renderIfExpression?: Nullable<string>
  customCss?: Nullable<string>
  guiCss?: Nullable<string>
  props?: Nullable<IPropData>
  preRenderActionId?: Nullish<string>
  postRenderActionId?: Nullish<string>
  propTransformationJs?: Nullish<string>
  propsData?: string
}

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementDTO = Pick<
  IUpdateElementDTO,
  | 'renderType'
  | 'name'
  | 'slug'
  | 'renderIfExpression'
  | 'renderForEachPropKey'
  | 'preRenderActionId'
  | 'postRenderActionId'
>

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export type IElementDTO = Omit<ElementFragment, 'parentComponent'> & {
  parentComponent?: IEntity
}
