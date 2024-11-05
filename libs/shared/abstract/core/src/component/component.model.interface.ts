import type { Typebox } from '@codelab/shared/abstract/typebox'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { IElementRenderTypeKind } from '../element'
import { PropSchema } from '../prop'
import { ComponentDtoSchema } from './component.dto.interface'

export const ComponentSchema = Type.Object({
  ...ComponentDtoSchema.properties,
  __typename: Type.Literal(`${IElementRenderTypeKind.Component}`),
  props: PropSchema,
  slug: Type.String(),
})

export type IComponent = Static<typeof ComponentSchema>
