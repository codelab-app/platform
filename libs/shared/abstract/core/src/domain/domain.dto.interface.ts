import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

export const DomainDtoSchema = Type.Object({
  app: Typebox.Ref,
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

export type IDomainDto = Static<typeof DomainDtoSchema>

export const DomainSchema = DomainDtoSchema

export type IDomain = Static<typeof DomainSchema>
