import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { IAtomID } from '../atom'
import type { IComponentID } from '../component'
import type { IPropDTO } from '../prop'
import type { IRenderTypeKind } from './render-type'

export interface RenderType {
  // This is the ID of either `atom` or `component`
  id: IAtomID | IComponentID
  kind: IRenderTypeKind
}

export interface ICreateElementData {
  id: string
  name: string
  parentElement?: Nullable<IEntity>
  preRenderAction?: Nullable<IEntity>
  postRenderAction?: Nullable<IEntity>
  customCss?: Nullable<string>
  guiCss?: Nullable<string>
  props?: Nullable<Pick<IPropDTO, 'data'>>
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
  renderType?: Nullable<RenderType>
  // renderComponentType?: IComponentDTO | null
  // renderAtomType?: IAtomDTO | null
  prevSibling?: IEntity | null
  nextSibling?: IEntity | null
  parentComponent?: IEntity | null
  parent?: IEntity | null
  firstChild?: IEntity | null
  props: IEntity
}
