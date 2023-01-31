import type { IField } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  fieldSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'

export class FieldRepository extends IRepository<IField> {
  private Field = Repository.instance.Field

  async find(where: BaseUniqueWhere) {
    return (
      await (
        await this.Field
      ).find({
        where,
        selectionSet: fieldSelectionSet,
      })
    )[0]
  }

  async save(field: IField, where?: BaseUniqueWhere) {
    if (await this.exists(field, where)) {
      return this.update(field, this.getWhere(field, where))
    }

    return (await this.add([field]))[0]
  }

  protected async _add(fields: Array<IField>) {
    return (
      await (
        await this.Field
      ).create({
        input: fields.map(({ api, fieldType, ...field }) => ({
          ...field,
        })),
      })
    ).fields
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */
  protected async _update(
    { api, fieldType, ...field }: IField,
    where: BaseUniqueWhere,
  ) {
    return (
      await (
        await this.Field
      ).update({
        update: field,
        where,
      })
    ).fields[0]
  }
}
