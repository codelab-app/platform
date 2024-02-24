import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'
import { IProp, IPropDto } from '../prop/prop.dto.interface'
import { IElementRenderTypeDto } from './element-render-type'

export const IElementDto = Type.Object({
  childMapperComponent: Typebox.Nullish(IRef),
  childMapperPreviousSibling: Typebox.Nullish(IRef),
  childMapperPropKey: Typebox.Nullish(Type.String()),
  /**
   * For frontend models we can compute from Mobx, but for backend we would map the data in
   */
  closestContainerNode: IRef,
  compositeKey: Typebox.Nullish(Type.String()),
  firstChild: Typebox.Nullish(IRef),
  id: Type.String(),
  name: Type.String(),
  nextSibling: Typebox.Nullish(IRef),
  page: Typebox.Nullish(IRef),
  parentComponent: Typebox.Nullish(IRef),
  parentElement: Typebox.Nullish(IRef),
  postRenderAction: Typebox.Nullish(IRef),
  preRenderAction: Typebox.Nullish(IRef),
  prevSibling: Typebox.Nullish(IRef),
  // Treat element as aggregate, so we include prop data here
  props: IPropDto,
  renderForEachPropKey: Typebox.Nullish(Type.String()),
  renderIfExpression: Typebox.Nullish(Type.String()),
  renderType: IElementRenderTypeDto,
  style: Typebox.Nullish(Type.String()),
  tailwindClassNames: Typebox.Nullish(Type.Array(Type.String())),
})

export type IElementDto = Static<typeof IElementDto>

export const IElement = Typebox.Overwrite(
  IElementDto,
  Type.Object({
    props: IProp,
  }),
)

export type IElement = Static<typeof IElement>

export const ICreateElementDto = Type.Composite([
  IElementDto,
  Type.Object({
    /**
     * Used for composite key
     */
    closestContainerNode: IRef,
  }),
])

export type ICreateElementDto = Static<typeof ICreateElementDto>
