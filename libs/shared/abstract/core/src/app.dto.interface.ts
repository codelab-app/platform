import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IAppDTO = Type.Object({
  domains: Type.Optional(Type.Array(IEntity)),
  id: Type.String(),
  name: Type.String(),
  pages: Type.Optional(Type.Array(IEntity)),
})

export type IAppDTO = Static<typeof IAppDTO>
