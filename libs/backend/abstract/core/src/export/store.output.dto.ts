import { IActionDTO, IStoreDTO } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IApiOutputDto } from './api.output.dto'

export const IStoreOutputDto = Type.Object({
  actions: Type.Array(IActionDTO),
  api: IApiOutputDto,
  store: IStoreDTO,
})

export type IStoreOutputDto = Static<typeof IStoreOutputDto>
