import type { IEnumTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import type {
  EnumTypeCreateInput,
  UpdateEnumTypesMutationVariables,
} from '@codelab/shared/infra/gql'

import type { IBaseTypeModel } from './base-type.model.interface'

export interface IEnumTypeValue {
  id: string
  key: string
  label: string
  value: string
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 *
 * @property {IEnumTypeValue[]} allowedValues - The list of allowed values.
 */
export interface IEnumType
  extends IBaseTypeModel<
    IEnumTypeDto,
    EnumTypeCreateInput,
    UpdateEnumTypesMutationVariables
  > {
  allowedValues: Array<IEnumTypeValue>
  kind: ITypeKind.EnumType
}
