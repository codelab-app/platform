import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { IElementRenderTypeKind } from '../element'
import { PropSchema } from '../prop'
import { ComponentDtoSchema } from './component.dto.interface'

export const ComponentSchema = Type.Composite([
  Type.Object({
    __typename: Type.Literal(`${IElementRenderTypeKind.Component}`),
  }),
  Typebox.Overwrite(
    ComponentDtoSchema,
    Type.Object({
      props: PropSchema,
      slug: Type.String(),
    }),
  ),
])

export type IComponent = Static<typeof ComponentSchema>
