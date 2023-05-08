import type { IElementDTO, RenderType } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'

export class Element implements IElementDTO {
  customCss?: Nullable<string> | undefined

  firstChild?: IEntity | null | undefined

  guiCss?: Nullable<string> | undefined

  id: string

  name: string

  nextSibling?: IEntity | null | undefined

  page?: IEntity | null | undefined

  parent?: IEntity | null | undefined

  parentComponent?: IEntity | null | undefined

  postRenderAction?: IEntity | null | undefined

  preRenderAction?: IEntity | null | undefined

  prevSibling?: IEntity | null | undefined

  propTransformationJs?: Nullable<string> | undefined

  props: IEntity

  renderForEachPropKey?: Nullable<string> | undefined

  renderIfExpression?: Nullable<string> | undefined

  renderType?: Nullable<RenderType> | undefined

  constructor({ id, name, props }: IElementDTO) {
    this.id = id
    this.name = name
    this.props = props
  }
}
