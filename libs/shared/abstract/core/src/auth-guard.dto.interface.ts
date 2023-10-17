import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IAuthGuardDTO = Type.Object({
  config: IEntity,
  id: Type.String(),
  name: Type.String(),
  resource: IEntity,
  responseTransformer: Type.String(),
})

export type IAuthGuardDTO = Static<typeof IAuthGuardDTO>
