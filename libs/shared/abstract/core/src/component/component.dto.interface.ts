import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementRenderTypeKind } from '../element'
import { IRef } from '../model/ref.interface'
import {
  IProp,
  IPropDto,
  PropDtoSchema,
  PropSchema,
} from '../prop/prop.dto.interface'

export const ComponentDtoSchema = Type.Object({
  api: Typebox.Ref,
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.Nullish(Typebox.Ref),
  props: PropDtoSchema,
  rootElement: Typebox.Ref,
  store: Typebox.Ref,
})

export type IComponentDto = Static<typeof ComponentDtoSchema>

export const ComponentSchema = Type.Composite([
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Component}`),
  }),
  Typebox.Overwrite(
    ComponentDtoSchema,
    Type.Object({
      props: PropSchema,
    }),
  ),
])

export type IComponent = Static<typeof ComponentSchema>
