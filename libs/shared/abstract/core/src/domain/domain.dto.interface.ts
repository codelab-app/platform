import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'

export const IDomainDto = Type.Object({
  app: IRef,
  /**
   * https://stackoverflow.com/a/74650249/2159920
   *
   * domainConfig: { misconfigured: boolean } | undefined
   */
  domainConfig: Type.Union([
    Type.Object({
      misconfigured: Type.Boolean(),
    }),
    Type.Undefined(),
  ]),
  id: Type.String(),
  name: Type.String(),
})

export type IDomainDto = Static<typeof IDomainDto>

export const IDomain = IDomainDto

export type IDomain = Static<typeof IDomain>
