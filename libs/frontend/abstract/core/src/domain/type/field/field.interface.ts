import type {
  FieldCreateInput,
  FieldDeleteInput,
  FieldUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IFieldDTO } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../../service'
import type { IModel } from '../../model.interface'
import type { IValidationRules } from '../field.validation'
import type { IInterfaceType, IType } from '../types'

export type IFieldDefaultValue =
  | Array<IFieldDefaultValue>
  | boolean
  | number
  | string
  | { [x: string]: IFieldDefaultValue }
export interface IField<T extends IType = IType>
  extends Omit<
      IModel<FieldCreateInput, FieldUpdateInput, FieldDeleteInput>,
      'toDeleteInput'
    >,
    ICacheService<IFieldDTO, IField> {
  api: Ref<IInterfaceType>
  defaultValues: Nullish<IFieldDefaultValue>
  description: Nullish<string>
  id: string
  key: string
  /**
   * Allows default to null
   */
  name: Nullish<string>
  nextSibling?: Nullish<Ref<IField>>
  prevSibling?: Nullish<Ref<IField>>
  type: Ref<T>
  validationRules: Nullish<IValidationRules>
  attachAsNextSibling(sibling: IField): void
  attachAsPrevSibling(sibling: IField): void
  changePrev(sibling: IField): void
  connectPrevToNextSibling(): void
  detachPrevSibling(): void
  toUpdateNodesInput(): Pick<FieldUpdateInput, 'nextSibling' | 'prevSibling'>
}

export type IFieldRef = string
