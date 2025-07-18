import type {
  IFieldDefaultValue,
  IFieldDto,
  IValidationRules,
} from '@codelab/shared-abstract-core'
import type { Nullish } from '@codelab/shared-abstract-types'
import type { FieldUpdateInput } from '@codelab/shared-infra-gqlgen'
import type { Ref } from 'mobx-keystone'

import type { IModel } from '../shared'
import type {
  IInterfaceTypeModel,
  ITypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '../type'

export interface IFieldModel<T extends ITypeModel = ITypeModel>
  extends IModel<IFieldDto, IFieldModel<T>> {
  api: Ref<IInterfaceTypeModel>
  defaultValues: Nullish<IFieldDefaultValue>
  description: Nullish<string>
  id: string
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
  toJsonSchema(context: ITypeTransformContext): JsonSchema
  toUpdateNodesInput(): Pick<FieldUpdateInput, 'nextSibling' | 'prevSibling'>
}
