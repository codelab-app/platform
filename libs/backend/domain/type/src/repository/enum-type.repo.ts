import type { IEnumTypeValue } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportEnumTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IEnumTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  connectAuth0Owner,
  connectNodeIds,
  reconnectNodeIds,
  whereNodeId,
} from '@codelab/shared/domain/mapper'

export class EnumTypeRepository extends AbstractRepository<
  IEnumTypeDTO,
  OGM_TYPES.EnumType,
  OGM_TYPES.EnumTypeWhere
> {
  private EnumType = Repository.instance.EnumType

  async find(where: OGM_TYPES.EnumTypeWhere) {
    return await (
      await this.EnumType
    ).find({
      selectionSet: exportEnumTypeSelectionSet,
      where,
    })
  }

  protected async _add(enumTypes: Array<IEnumTypeDTO>) {
    return (
      await (
        await this.EnumType
      ).create({
        input: enumTypes.map(
          ({ __typename, allowedValues, owner, ...enumType }) => ({
            ...enumType,
            allowedValues: connectNodeIds(
              allowedValues.map((value) => value.id),
            ),
            // allowedValues: this.mapCreateEnumTypeValues(allowedValues),
            owner: connectAuth0Owner(owner),
          }),
        ),
      })
    ).enumTypes
  }

  protected async _update(
    { __typename, allowedValues, id, name, owner, ...enumType }: IEnumTypeDTO,
    where: OGM_TYPES.EnumTypeWhere,
  ) {
    return (
      await (
        await this.EnumType
      ).update({
        update: {
          allowedValues: reconnectNodeIds(
            allowedValues.map((value) => value.id),
          ),
          name,
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
