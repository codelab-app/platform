import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { IAtomDTO, IAtomID } from '../atom'
import type { IComponentDTO, IComponentID } from '../component'
import type { IProp, IPropData, IPropDTO } from '../prop'
import type { ElementFragment } from './element.fragment.graphql.gen'

export enum RenderTypeEnum {
  Component = 'component',
  Atom = 'atom',
}

export interface RenderType {
  // This is the ID of either `atom` or `component`
  id: IAtomID | IComponentID
  model: RenderTypeEnum
}

export interface ICreateElementData {
  id: string
  name: string
  parentElement?: Nullable<IEntity>
  preRenderAction?: Nullable<IEntity>
  postRenderAction?: Nullable<IEntity>
  customCss?: Nullish<string>
  guiCss?: Nullish<string>
  props?: Nullish<Pick<IPropDTO, 'data'>>
  prevSibling?: Nullable<IEntity>
  /**
   * We should connect to `atom` or `component` in future
   */
  renderType?: Nullable<RenderType>
}

export type IUpdateElementData = Pick<
  ICreateElementData,
  | 'id'
  | 'name'
  | 'renderType'
  | 'preRenderAction'
  | 'postRenderAction'
  | 'customCss'
  | 'guiCss'
  | 'props'
> & {
  renderForEachPropKey?: Nullable<string>
  renderIfExpression?: Nullable<string>
  propTransformationJs?: Nullish<string>
}

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementData = Pick<
  IUpdateElementData,
  | 'id'
  | 'renderType'
  | 'name'
  | 'renderIfExpression'
  | 'renderForEachPropKey'
  | 'preRenderAction'
  | 'postRenderAction'
>

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export interface IElementDTO {
  id: string
  name: string
  // slug: string
  customCss?: Nullable<string>
  guiCss?: Nullable<string>
  renderForEachPropKey?: Nullable<string>
  renderIfExpression?: Nullable<string>
  preRenderAction?: IEntity | null
  postRenderAction?: IEntity | null
  propTransformationJs?: Nullable<string>
  page?: IEntity | null
  renderComponentType?: IComponentDTO | null
  renderAtomType?: IAtomDTO | null
  prevSibling?: IEntity | null
  nextSibling?: IEntity | null
  parentComponent?: IComponentDTO | null
  parent?: IEntity | null
  firstChild?: IEntity | null
  props?: IPropDTO | null
}
