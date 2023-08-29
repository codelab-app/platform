import type { IPropDTO, RenderType } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'

export interface ICreateElementData {
  id: string
  name: string
  parentElement?: Nullable<IEntity>
  postRenderAction?: Nullable<IEntity>
  preRenderAction?: Nullable<IEntity>
  prevSibling?: Nullable<IEntity>
  props?: Nullable<Pick<IPropDTO, 'data'>>
  /**
   * We should connect to `atom` or `component` in future
   */
  renderType?: Nullable<RenderType>
  style?: Nullable<string>
}

export type IUpdateElementData = Pick<
  ICreateElementData,
  | 'name'
  | 'postRenderAction'
  | 'preRenderAction'
  | 'renderType'
  | 'style'
> &
  Pick<ICreateElementData, 'id'> & {
    childMapperComponent?: Nullish<IEntity>
    childMapperPreviousSibling?: Nullish<IEntity>
    childMapperPropKey?: Nullish<string>
    renderForEachPropKey?: Nullable<string>
    renderIfExpression?: Nullable<string>
  }

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementData = Pick<
  IUpdateElementData,
  | 'childMapperComponent'
  | 'childMapperPreviousSibling'
  | 'childMapperPropKey'
  | 'id'
  | 'name'
  | 'postRenderAction'
  | 'preRenderAction'
  | 'renderForEachPropKey'
  | 'renderIfExpression'
  | 'renderType'
>
