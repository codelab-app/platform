import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

export const StoreDtoSchema = Type.Object({
  actions: Type.Optional(Type.Array(Typebox.Ref)),
  api: Typebox.Ref,
  component: Typebox.Nullish(Typebox.Ref),
  id: Type.String(),
  name: Type.String(),
  page: Typebox.Nullish(Typebox.Ref),
  source: Typebox.Nullish(Typebox.Ref),
})

export type IStoreDto = Static<typeof StoreDtoSchema>
