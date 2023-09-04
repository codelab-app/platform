import {
  IApiEntity,
  IFieldDTO,
  IInterfaceTypeDTO,
  IInterfaceTypeEntity,
} from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeOutputDto } from './type.output.dto'

/**
 * Represents an nested type exported. Since interface or arrays could have nested interface and fields, this allows for recursive data structure
 *
 * The root api is ordered firs t
 */
export const IApiOutputDto = Type.Object({
  api: IInterfaceTypeEntity,
  fields: Type.Array(IFieldDTO),
  types: Type.Array(ITypeOutputDto),
})

export type IApiOutputDto = Static<typeof IApiOutputDto>
