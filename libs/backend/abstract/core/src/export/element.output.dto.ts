import { IElementDTO } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'

export const IElementOutputDto = IElementDTO

export type IElementOutputDto = Static<typeof IElementOutputDto>
