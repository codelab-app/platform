import type { IField, IInterfaceType } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  interfaceTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { connectNode, connectOwner } from '@codelab/shared/domain/mapper'

export class InterfaceTypeRepository extends IRepository<IInterfaceType> {
  private InterfaceType = Repository.instance.InterfaceType

  async find(where: BaseUniqueWhere) {
    return (
      await (
        await this.InterfaceType
      ).find({
        where,
        selectionSet: interfaceTypeSelectionSet,
      })
    )[0]
  }

  async save(interfaceType: IInterfaceType, where?: BaseUniqueWhere) {
    if (await this.exists(interfaceType, where)) {
      return this.update(interfaceType, this.getWhere(interfaceType, where))
    }

    return (await this.add([interfaceType]))[0]
  }

  /**
   * If interface doesn't exist, we can safely assume that fields don't exist as well. So fields will always be created.
   *
   * Even if interface was deleted & fields are not, it is no harm to leave those old fields un-attached. We could run a clean up process for un-attached fields
   */
  protected async _add(interfaceTypes: Array<IInterfaceType>) {
    return (
      await (
        await this.InterfaceType
      ).create({
        input: interfaceTypes.map(
          ({ __typename, fields, owner, ...interfaceType }) => ({
            ...interfaceType,
            fields: this.mapCreateFields(fields),
            owner: connectOwner(owner.auth0Id),
          }),
        ),
      })
    ).interfaceTypes
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */
  protected async _update(
    { __typename, fields, owner, ...data }: IInterfaceType,
    where: BaseUniqueWhere,
  ) {
    return (
      await (
        await this.InterfaceType
      ).update({
        update: {
          ...data,
          // fields: this.mapUpdateFields(fields),
        },
        where,
      })
    ).interfaceTypes[0]
  }

  private mapCreateFields(
    fields: Array<IField>,
  ): OGM_TYPES.InterfaceTypeFieldsFieldInput {
    return {
      create: fields.map(({ api, fieldType, ...field }) => ({
        node: {
          ...field,
          fieldType: connectNode(fieldType.id),
        },
      })),
    }
  }

  /**
   * Don't update fields in interface. If done here, would have to assume the fields exist or not.
   *
   * Different logic exists for field update or creation here
   */
  // private mapUpdateFields(
  //   fields: Array<IField>,
  // ): OGM_TYPES.InterfaceTypeFieldsUpdateFieldInput {
  //   return {
  //     create: fields.map(({ api, fieldType, ...field }) => ({
  //       node: {
  //         ...field,
  //         fieldType: connectNode(fieldType.id),
  //       },
  //     })),
  //   }
  // }
}
