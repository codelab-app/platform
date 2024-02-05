import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from './model/node-type.interface'
import { IProp, IPropDTO } from './prop.dto.interface'

export const IAuthGuardDTO = Type.Object({
  config: IPropDTO,
  id: Type.String(),
  name: Type.String(),
  resource: IRef,
  responseTransformer: Type.String(),
})

export type IAuthGuardDTO = Static<typeof IAuthGuardDTO>

export const IAuthGuard = Typebox.Overwrite(
  IAuthGuardDTO,
  Type.Object({
    config: IProp,
  }),
)

export type IAuthGuard = Static<typeof IAuthGuard>
