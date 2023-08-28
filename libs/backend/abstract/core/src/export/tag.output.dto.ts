import { ITagDTO } from '@codelab/shared/abstract/core'
import { type Static, Type } from '@sinclair/typebox'

export const ITagOutputDto = Type.Omit(ITagDTO, ['owner'])

export type ITagOutputDto = Static<typeof ITagOutputDto>
