import type {
  IElementDto,
  IElementRenderTypeDto,
  IPropDto,
  IRef,
} from '@codelab/shared-abstract-core'
import type { Nullable, Nullish } from '@codelab/shared-abstract-types'

export class Element implements IElementDto {
  childMapperComponent?: Nullish<IRef>

  childMapperPreviousSibling?: Nullish<IRef>

  childMapperPropKey?: Nullable<string> | undefined

  closestContainerNode: IRef

  firstChild?: Nullish<IRef>

  id: string

  name: string

  nextSibling?: Nullish<IRef>

  page?: Nullish<IRef>

  parent?: Nullish<IRef>

  parentComponent?: Nullish<IRef>

  postRenderActions?: Array<IRef>

  preRenderActions?: Array<IRef>

  prevSibling?: Nullish<IRef>

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
  }: IElementDto) {
    this.id = id
    this.props = props
    this.closestContainerNode = closestContainerNode
    this.name = name
    this.renderType = renderType
  }
}
