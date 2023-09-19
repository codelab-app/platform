import { IPageDTO } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IElementOutputDto } from './element.output.dto'
import { IStoreOutputDto } from './store.output.dto'

export const IPageOutputDto = Type.Object({
  /**
   * This is computed
   */
  elements: Type.Array(IElementOutputDto),
  page: IPageDTO,
  store: IStoreOutputDto,
})

export type IPageOutputDto = Static<typeof IPageOutputDto>
