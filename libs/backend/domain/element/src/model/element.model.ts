import type {
  ICreateElementDto,
  IElementDto,
  IElementRenderTypeDto,
  IPropDto,
  IRef,
} from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'

export class Element implements IElementDto {
  childMapperComponent?: IRef | null | undefined

  childMapperPreviousSibling?: IRef | null | undefined

  childMapperPropKey?: Nullable<string> | undefined

  closestContainerNode: IRef

  firstChild?: IRef | null | undefined

  id: string

  name: string

  nextSibling?: IRef | null | undefined

  page?: IRef | null | undefined

  parent?: IRef | null | undefined

  parentComponent?: IRef | null | undefined

  postRenderAction?: IRef | null | undefined

  preRenderAction?: IRef | null | undefined

  prevSibling?: IRef | null | undefined

  props: IPropDto

  renderForEachPropKey?: Nullable<string> | undefined

  renderIfExpression?: Nullable<string> | undefined

  renderType: IElementRenderTypeDto

  style?: Nullable<string> | undefined

  constructor({
    closestContainerNode,
    id,
    name,
    props,
    renderType,
  }: ICreateElementDto) {
    this.id = id
    this.props = props
    this.closestContainerNode = closestContainerNode
    this.name = name
    this.renderType = renderType
  }
}
