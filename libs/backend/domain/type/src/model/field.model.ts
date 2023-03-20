import type { IFieldDTO } from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'

export class Field implements IFieldDTO {
  readonly api: { id: string }

  readonly defaultValues: string | null

  readonly description: string | null

  readonly fieldType: IEntity

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

  /**
   * Used to get composite key, fieldKey is
   */
  static compositeKey(apiName: string, fieldKey: string) {
    return `${apiName}-${fieldKey}`
  }

  static create({ api, fieldType, id, key }: IFieldDTO) {
    return new Field({
      api,
      fieldType,
      id,
      key,
      name: compoundCaseToTitleCase(key),
    })
  }
}
