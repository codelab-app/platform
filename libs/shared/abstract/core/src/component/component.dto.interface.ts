import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { IElementRenderTypeKind } from '../element'
import { PropSchema } from '../prop'
import { PropDtoSchema } from '../prop/prop.dto.interface'

export const ComponentDtoSchema = Type.Object({
  api: Typebox.Ref,
  id: Type.String(),
  name: Type.String(),
  owner: Typebox.Ref,
  props: PropDtoSchema,
  rootElement: Typebox.Ref,
  store: Typebox.Ref,
})

export type IComponentDto = Static<typeof ComponentDtoSchema>
