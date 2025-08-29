import type { Nullish } from '@codelab/shared-abstract-types'

import type { IFieldDto } from './field.dto.interface'
import type { IValidationRules } from './field.validation'

export enum FieldFormStep {
  CreateFieldFormStep = 'CreateFieldFormStep',
  DefaultValueFormStep = 'DefaultValueFormStep',
  UpdateFieldFormStep = 'UpdateFieldFormStep',
}

export type IFieldCreateData = IFieldCreateFormData & IFieldDefaultValueFormData
export interface IFieldCreateFormData
  extends Pick<
    IFieldDto,
    'api' | 'description' | 'fieldType' | 'id' | 'key' | 'name'
  > {
  validationRules?: Nullish<IValidationRules>
}

export interface IFieldDefaultValueFormData {
  defaultValues?: Nullish<unknown>
}

export type IFieldUpdateFormData = IFieldCreateFormData &
  Pick<IFieldDto, 'prevSibling'>

export type IFieldUpdateData = IFieldCreateData

export type IFieldDefaultValue =
  | boolean
  | number
  | string
  | Array<IFieldDefaultValue>
  | { [x: string]: IFieldDefaultValue }
