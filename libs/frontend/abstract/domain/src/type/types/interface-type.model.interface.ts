import type {
  InterfaceTypeCreateInput,
  UpdateInterfaceTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  IInterfaceTypeDto,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IFieldModel, IFieldNodeData } from '../../field'
import type { ITreeNode } from '../../shared'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceTypeModel
  extends IBaseTypeModel<
    IInterfaceTypeDto,
    InterfaceTypeCreateInput,
    UpdateInterfaceTypesMutationVariables
  > {
  defaultValues: IPropData
  fields: Array<IFieldModel>
  fieldsTree: Array<ITreeNode<IFieldNodeData>>
  kind: ITypeKind.InterfaceType
}
