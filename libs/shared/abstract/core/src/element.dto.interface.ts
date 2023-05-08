import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { RenderType } from './render-type'

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
