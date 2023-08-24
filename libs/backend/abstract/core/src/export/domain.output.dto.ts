import { IDomainDTO } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'

export const IDomainOutputDto = IDomainDTO

export type IDomainOutputDto = Static<typeof IDomainOutputDto>
