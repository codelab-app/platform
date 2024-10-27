import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { PropDtoSchema, PropSchema } from '../prop'
import { ElementRenderTypeDtoSchema } from './element-render-type'

export const ElementDtoSchema = Type.Object({
  childMapperComponent: Typebox.Nullish(Typebox.Ref),
  childMapperPreviousSibling: Typebox.Nullish(Typebox.Ref),
  childMapperPropKey: Typebox.Nullish(Type.String()),
  /**
   * For frontend models we can compute from Mobx, but for backend we would map the data in
   *
   * This is not used for creation, but rather a computed value
   *
   * `Page` or `Component`
   *
   * Used for composite key, could be `Page` or `Component` type. This key is only needed for creation so we know how to make the connection
   */
  closestContainerNode: Typebox.Ref,
  compositeKey: Typebox.Nullish(Type.String()),
  expanded: Typebox.Nullish(Type.Boolean()),
  firstChild: Typebox.Nullish(Typebox.Ref),
  id: Type.String(),
  name: Type.String(),
  nextSibling: Typebox.Nullish(Typebox.Ref),
  page: Typebox.Nullish(Typebox.Ref),
  parentComponent: Typebox.Nullish(Typebox.Ref),
  parentElement: Typebox.Nullish(Typebox.Ref),
  postRenderAction: Typebox.Nullish(Typebox.Ref),
  preRenderAction: Typebox.Nullish(Typebox.Ref),
  prevSibling: Typebox.Nullish(Typebox.Ref),
  // Treat element as aggregate, so we include prop data here
  props: PropDtoSchema,
  renderForEachPropKey: Typebox.Nullish(Type.String()),
  renderIfExpression: Typebox.Nullish(Type.String()),
  renderType: ElementRenderTypeDtoSchema,
  style: Typebox.Nullish(Type.String()),
  tailwindClassNames: Typebox.Nullish(Type.Array(Type.String())),
})

export type IElementDto = Static<typeof ElementDtoSchema>

export const ElementSchema = Typebox.Overwrite(
  ElementDtoSchema,
  Type.Object({
    props: PropSchema,
  }),
)

export type IElement = Static<typeof ElementSchema>

export const ElementCreateDtoSchema = Type.Composite([
  ElementDtoSchema,
  Type.Object({
    closestContainerNode: Typebox.Ref,
  }),
])

export type IElementCreateDto = Static<typeof ElementCreateDtoSchema>
