import type {
  InterfaceTypeCreateInput,
  UpdateInterfaceTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  IInterfaceTypeDTO,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IStateTreeDataNode } from '../../shared'
import type { IFieldModel } from '../field'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceTypeModel
  extends IBaseTypeModel<
    IInterfaceTypeDTO,
    InterfaceTypeCreateInput,
    UpdateInterfaceTypesMutationVariables
  > {
  defaultValues: IPropData
  fields: Array<IFieldModel>
  fieldsTree: Array<IStateTreeDataNode>
  kind: ITypeKind.InterfaceType
}

export type IInterfaceTypeRef = string
