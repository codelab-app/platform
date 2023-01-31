import type { IEnumType, IEnumTypeValue } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  exportEnumTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { connectOwner, whereNodeId } from '@codelab/shared/domain/mapper'

export class EnumTypeRepository extends IRepository<IEnumType> {
  private EnumType = Repository.instance.EnumType

  async find(where: BaseUniqueWhere) {
    return (
      await (
        await this.EnumType
      ).find({
        where,
        selectionSet: exportEnumTypeSelectionSet,
      })
    )[0]
  }

  async save(enumType: IEnumType, where?: BaseUniqueWhere) {
    if (await this.exists(enumType, where)) {
      return this.update(enumType, this.getWhere(enumType, where))
    }

    return (await this.add([enumType]))[0]
  }

  protected async _add(enumTypes: Array<IEnumType>) {
    return (
      await (
        await this.EnumType
      ).create({
        input: enumTypes.map(({ allowedValues, owner, ...enumType }) => ({
          ...enumType,
          allowedValues: this.mapCreateEnumTypeValues(allowedValues),
          owner: connectOwner(owner.auth0Id),
        })),
      })
    ).enumTypes
  }

  protected async _update(
    { allowedValues, owner, ...enumType }: IEnumType,
    where: BaseUniqueWhere,
  ) {
    return (
      await (
        await this.EnumType
      ).update({
        update: {
          ...enumType,
          allowedValues: this.mapUpdateEnumTypeValues(allowedValues),
          owner: connectOwner(owner.auth0Id),
        },
        where,
      })
    ).enumTypes[0]
  }

  private mapCreateEnumTypeValues(
    enumTypeValues: Array<IEnumTypeValue>,
  ): OGM_TYPES.EnumTypeAllowedValuesFieldInput {
    return {
      create: enumTypeValues.map((enumTypeValue) => ({
        node: {
          ...enumTypeValue,
        },
      })),
    }
  }

  private mapUpdateEnumTypeValues(
    enumTypeValues: Array<IEnumTypeValue>,
  ): Array<OGM_TYPES.EnumTypeAllowedValuesUpdateFieldInput> {
    return enumTypeValues.map((enumTypeValue) => ({
      ...whereNodeId(enumTypeValue.id),
      update: {
        node: enumTypeValue,
      },
    }))
  }
}
