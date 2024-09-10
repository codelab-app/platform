import type {
  ICreateElementDto,
  IElementDto,
  IElementRenderTypeDto,
  IPropDto,
  IRef,
} from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'

export class Element implements IElementDto {
  childMapperComponent?: Nullish<IRef>

  childMapperPreviousSibling?: Nullish<IRef>

  childMapperPropKey?: Nullable<string> | undefined

  closestContainerNode: IRef

  expended: Nullish<boolean>

  firstChild?: Nullish<IRef>

  id: string

  name: string

  nextSibling?: Nullish<IRef>

  page?: Nullish<IRef>

  parent?: Nullish<IRef>

  parentComponent?: Nullish<IRef>

  postRenderAction?: Nullish<IRef>

  preRenderAction?: Nullish<IRef>

  prevSibling?: Nullish<IRef>

  props: IPropDto

  renderForEachPropKey?: Nullable<string> | undefined

  renderIfExpression?: Nullable<string> | undefined

  renderType: IElementRenderTypeDto

  style?: Nullable<string> | undefined

  constructor({
    closestContainerNode,
    expended,
    id,
    name,
    props,
    renderType,
  }: ICreateElementDto) {
    this.id = id
    this.props = props
    this.expended = expended
    this.closestContainerNode = closestContainerNode
    this.name = name
    this.renderType = renderType
  }
}
