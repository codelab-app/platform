import { IFieldDTO, IInterfaceTypeEntity } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeOutputDto } from './type.output.dto'

/**
 * Represents an nested type exported. Since interface or arrays could have nested interface and fields, this allows for recursive data structure
 *
 * The root api is ordered first
 */
export const IApiOutputDto = Type.Composite([
  IInterfaceTypeEntity,
  Type.Object(
    {
      fields: Type.Array(IFieldDTO),
      types: Type.Array(ITypeOutputDto),
    },
    {
      default: {
        types: [],
      },
    },
  ),
])

export type IApiOutputDto = Static<typeof IApiOutputDto>
