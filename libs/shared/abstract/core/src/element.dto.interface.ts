import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementRenderTypeDto } from './element-render-type'
import { IProp, IPropDTO } from './prop.dto.interface'

export const IElementDTO = Type.Object({
  childMapperComponent: Typebox.Nullish(IEntity),
  childMapperPreviousSibling: Typebox.Nullish(IEntity),
  childMapperPropKey: Typebox.Nullish(Type.String()),
  /**
   * For frontend models we can compute from Mobx, but for backend we would map the data in
   */
  closestContainerNode: IEntity,
  compositeKey: Typebox.Nullish(Type.String()),
  firstChild: Typebox.Nullish(IEntity),
  id: Type.String(),
  name: Type.String(),
  nextSibling: Typebox.Nullish(IEntity),
  page: Typebox.Nullish(IEntity),
  parentComponent: Typebox.Nullish(IEntity),
  parentElement: Typebox.Nullish(IEntity),
  postRenderAction: Typebox.Nullish(IEntity),
  preRenderAction: Typebox.Nullish(IEntity),
  prevSibling: Typebox.Nullish(IEntity),
  // Treat element as aggregate, so we include prop data here
  props: IPropDTO,
  renderForEachPropKey: Typebox.Nullish(Type.String()),
  renderIfExpression: Typebox.Nullish(Type.String()),
  renderType: IElementRenderTypeDto,
  style: Typebox.Nullish(Type.String()),
  tailwindClassNames: Typebox.Nullish(Type.Array(Type.String())),
})

export type IElementDTO = Static<typeof IElementDTO>

export const IElement = Typebox.Overwrite(
  IElementDTO,
  Type.Object({
    props: IProp,
  }),
)

export type IElement = Static<typeof IElement>

export const ICreateElementDTO = Type.Composite([
  IElementDTO,
  Type.Object({
    /**
     * Used for composite key
     */
    closestContainerNode: IEntity,
  }),
])

export type ICreateElementDTO = Static<typeof ICreateElementDTO>
