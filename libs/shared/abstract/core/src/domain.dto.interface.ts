import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from './model/node-type.interface'

export const IDomainDTO = Type.Object({
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
  projectDomain: Type.Union([
    Type.Object({ verified: Type.Boolean() }),
    Type.Undefined(),
  ]),
})

export type IDomainDTO = Static<typeof IDomainDTO>

export const IDomain = IDomainDTO

export type IDomain = Static<typeof IDomain>