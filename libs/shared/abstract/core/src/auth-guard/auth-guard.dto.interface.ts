import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRedirectDto } from './redirect'

export const IAuthGuardDTO = Type.Object({
  config: IEntity,
  id: Type.String(),
  name: Type.String(),
  redirect: IRedirectDto,
  resource: IEntity,
  responseTransformer: Type.String(),
})

export type IAuthGuardDTO = Static<typeof IAuthGuardDTO>
