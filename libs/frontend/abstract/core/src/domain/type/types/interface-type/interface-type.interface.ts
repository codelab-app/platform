import type {
  InterfaceTypeCreateInput,
  UpdateInterfaceTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IPropData } from '../../../prop'
import type { IField } from '../../field'
import type { IBaseType } from '../base-type'
import type { IInterfaceTypeDTO } from './interface-type.dto.interface'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType
  extends IBaseType<
    IInterfaceTypeDTO,
    InterfaceTypeCreateInput,
    UpdateInterfaceTypesMutationVariables
  > {
  defaultValues: IPropData
  fields: Array<IField>
  kind: ITypeKind.InterfaceType
}

export type IInterfaceTypeRef = string
