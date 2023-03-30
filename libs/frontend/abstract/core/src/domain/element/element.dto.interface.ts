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
  customCss?: Nullable<string>
  guiCss?: Nullable<string>
  id: string
  name: string
  page?: Nullable<IEntity>
  parentComponent?: Nullable<IEntity>
  parentElement?: Nullable<IEntity>
  postRenderAction?: Nullable<IEntity>
  preRenderAction?: Nullable<IEntity>
  prevSibling?: Nullable<IEntity>
  propTransformationJs?: Nullable<string>
  props?: Nullable<Pick<IPropDTO, 'data'>>
  /**
   * We should connect to `atom` or `component` in future
   */
  renderType?: Nullable<RenderType>
}

export type IUpdateElementData = Partial<
  Pick<
    ICreateElementData,
    | 'customCss'
    | 'guiCss'
    | 'name'
    | 'postRenderAction'
    | 'preRenderAction'
    | 'renderType'
  >
> &
  Pick<ICreateElementData, 'id'> & {
    propTransformationJs?: Nullish<string>
    renderForEachPropKey?: Nullable<string>
    renderIfExpression?: Nullable<string>
  }

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementData = Pick<
  IUpdateElementData,
  | 'id'
  | 'name'
  | 'postRenderAction'
  | 'preRenderAction'
  | 'renderForEachPropKey'
  | 'renderIfExpression'
  | 'renderType'
>

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export interface IElementDTO {
  // slug: string
  customCss?: Nullable<string>
  firstChild?: IEntity | null
  guiCss?: Nullable<string>
  id: string
  name: string
  nextSibling?: IEntity | null
  page?: IEntity | null
  parent?: IEntity | null
  parentComponent?: IEntity | null
  postRenderAction?: IEntity | null
  preRenderAction?: IEntity | null
  // renderComponentType?: IComponentDTO | null
  // renderAtomType?: IAtomDTO | null
  prevSibling?: IEntity | null
  propTransformationJs?: Nullable<string>
  props: IEntity
  renderForEachPropKey?: Nullable<string>
  renderIfExpression?: Nullable<string>
  renderType?: Nullable<RenderType>
}
