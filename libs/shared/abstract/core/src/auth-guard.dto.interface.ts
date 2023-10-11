import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IProp, IPropDTO } from './prop.dto.interface'
import { IRef } from './model/node-type.interface'
import { Typebox } from '@codelab/shared/abstract/typebox'

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
