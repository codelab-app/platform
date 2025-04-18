import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared-infra-typebox'
import { Type } from '@sinclair/typebox'

import { IElementRenderTypeKind } from '../element'
import { PropDtoSchema } from '../prop/prop.dto.interface'

export const ComponentDtoSchema = Type.Object({
  __typename: Type.Literal(`${IElementRenderTypeKind.Component}`),
  api: Typebox.RefSchema,
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.RefSchema,
  props: PropDtoSchema,
  rootElement: Typebox.RefSchema,
  store: Typebox.RefSchema,
})

export type IComponentDto = Static<typeof ComponentDtoSchema>
