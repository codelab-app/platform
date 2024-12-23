import type { IFieldDto, IRef } from '@codelab/shared/abstract/core'

import { titleCase } from '@codelab/shared/utils'

export class Field implements IFieldDto {
  /**
   * Used to get composite key, fieldKey is
   */
  static compositeKey(apiName: string, fieldKey: string) {
    return `${apiName}-${fieldKey}`
  }

  static create({ api, fieldType, id, key }: IFieldDto) {
    return new Field({
      api,
      defaultValues: null,
      fieldType,
      id,
      key,
      name: titleCase(key),
    })
  }

  readonly api: { id: string }

  readonly defaultValues: string | null

  readonly description: string | null

  readonly fieldType: IRef

  readonly id: string

  readonly key: string

  readonly name: string | null

  nextSibling?: IRef | null | undefined

  prevSibling?: IRef | null | undefined

  readonly validationRules: string | null

  constructor({
    api,
    defaultValues = null,
    description = null,
    fieldType,
    id,
    key,
    name = null,
    nextSibling = null,
    prevSibling = null,
    validationRules = null,
  }: IFieldDto) {
    this.api = { id: api.id }
    this.defaultValues = defaultValues
    this.description = description
    this.fieldType = { id: fieldType.id }
    this.id = id
    this.key = key
    this.name = name
    this.validationRules = validationRules
    this.nextSibling = nextSibling
    this.prevSibling = prevSibling
  }
}
