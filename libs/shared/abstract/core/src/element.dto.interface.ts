import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { RenderType } from './render-type'

/**
 * This is the graphql fragment equivalent, used for hydrating object
 */
export interface IElementDTO {
  // slug: string
  childMapperComponent?: Nullable<IEntity>
  childMapperPreviousSibling?: Nullable<IEntity>
  childMapperPropKey?: Nullable<string>
  customCss?: Nullable<string>
  firstChild?: Nullable<IEntity>
  guiCss?: Nullable<string>
  id: string
  name: string
  nextSibling?: Nullable<IEntity>
  page?: Nullable<IEntity>
  parent?: Nullable<IEntity>
  parentComponent?: Nullable<IEntity>
  postRenderAction?: Nullable<IEntity>
  preRenderAction?: Nullable<IEntity>
  prevSibling?: Nullable<IEntity>
  propTransformationJs?: Nullable<string>
  props: IEntity
  renderForEachPropKey?: Nullable<string>
  renderIfExpression?: Nullable<string>
  renderType?: Nullable<RenderType>
}
