import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRedirectTargetType } from './redirect-target-type.enum'
import { IRef } from '../model/node-type.interface'
import { IProp } from '../prop.dto.interface'

export const IRedirectDTO = Type.Object({
  authGuard: IRef,
  id: Type.String(),
  source: IRef,
  targetPage: Typebox.Nullish(IRef),
  targetType: Type.Enum(IRedirectTargetType),
  targetUrl: Typebox.Nullish(Type.String()),
})

export type IRedirectDTO = Static<typeof IRedirectDTO>


export const IRedirect = Typebox.Overwrite(
  IRedirectDTO,
  Type.Object({
    config: IProp,
  }),
)

export type IRedirect = Static<typeof IRedirect>
