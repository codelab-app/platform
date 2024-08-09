import type {
  FieldCreateInput,
  FieldDeleteInput,
  FieldUpdateInput,
} from '@codelab/shared/infra/gql'
import type {
  IField,
  IFieldDefaultValue,
  IFieldDto,
  IValidationRules,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService, IModel } from '../shared'
import type { IInterfaceTypeModel, ITypeModel } from '../type'

export interface IFieldModel<T extends ITypeModel = ITypeModel>
  extends Omit<
      IModel<FieldCreateInput, FieldUpdateInput, FieldDeleteInput, IField>,
      'toDeleteInput'
    >,
    ICacheService<IFieldDto, IFieldModel> {
  api: Ref<IInterfaceTypeModel>
  defaultValues: Nullish<IFieldDefaultValue>
  description: Nullish<string>
  key: string
  /**
   * Allows default to null
   */
  name: Nullish<string>
  nextSibling?: Nullish<Ref<IFieldModel>>
  prevSibling?: Nullish<Ref<IFieldModel>>
  type: Ref<T>
  validationRules: Nullish<IValidationRules>

  attachAsNextSibling(sibling: IFieldModel): void
  attachAsPrevSibling(sibling: IFieldModel): void
  changePrev(sibling: IFieldModel): void
  connectPrevToNextSibling(): void
  detachPrevSibling(): void
  toUpdateNodesInput(): Pick<FieldUpdateInput, 'nextSibling' | 'prevSibling'>
}
