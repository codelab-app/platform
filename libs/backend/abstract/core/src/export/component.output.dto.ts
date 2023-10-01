import {
  IComponentDTO,
  IElementDTO,
  IPropDTO,
} from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IApiOutputDto } from './api.output.dto'
import { IStoreOutputDto } from './store.output.dto'

/**
 * This type is used for exporting components individually
 * We need to export the types and descendant elements as wel l
 */
export const IComponentOutputDto = Type.Object({
  api: IApiOutputDto,
  component: IComponentDTO,
  descendantElements: Type.Array(IElementDTO),
  store: IStoreOutputDto,
})

export type IComponentOutputDto = Static<typeof IComponentOutputDto>
