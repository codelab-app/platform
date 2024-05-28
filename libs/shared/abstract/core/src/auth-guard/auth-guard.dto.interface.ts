import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'
import { IProp, IPropDto } from '../prop/prop.dto.interface'

export const IAuthGuardDto = Type.Object({
  config: IPropDto,
  id: Type.String(),
  name: Type.String(),
  resource: IRef,
  responseTransformer: Type.String(),
})

export type IAuthGuardDto = Static<typeof IAuthGuardDto>

export const IAuthGuard = Typebox.Overwrite(
  IAuthGuardDto,
  Type.Object({
    config: IProp,
  }),
)

export type IAuthGuard = Static<typeof IAuthGuard>
