import type { IFieldDTO } from '@codelab/frontend/abstract/core'

export class Field implements IFieldDTO {
  readonly api: { id: string }

  readonly defaultValues: string | null

  readonly description: string | null

  readonly fieldType: { id: string }

  readonly id: string

  readonly key: string

  readonly name: string | null

  readonly validationRules: string | null

  constructor({
    api,
    defaultValues = null,
    description = null,
    fieldType,
    id,
    key,
    name = null,
    validationRules = null,
  }: IFieldDTO) {
    this.api = { id: api.id }
    this.defaultValues = defaultValues
    this.description = description
    this.fieldType = { id: fieldType.id }
    this.id = id
    this.key = key
    this.name = name
    this.validationRules = validationRules
  }

  static compositeKey(apiName: string, fieldKey: string) {
    return `${apiName}-${fieldKey}`
  }
}
