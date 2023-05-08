import {
  exportEnumTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type {
  IEnumTypeDTO,
  IEnumTypeValueDTO,
} from '@codelab/shared/abstract/core'
import { connectAuth0Owner, whereNodeId } from '@codelab/shared/domain/mapper'

export class EnumTypeRepository extends AbstractRepository<
  IEnumTypeDTO,
  OGM_TYPES.EnumType,
  OGM_TYPES.EnumTypeWhere
> {
  private EnumType = Repository.instance.EnumType

  async _find(where: OGM_TYPES.EnumTypeWhere) {
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
            allowedValues: this.mapCreateEnumTypeValues(allowedValues),
            owner: connectAuth0Owner(owner),
          }),
        ),
        selectionSet: `{ enumTypes ${exportEnumTypeSelectionSet} }`,
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
        selectionSet: `{ enumTypes ${exportEnumTypeSelectionSet} }`,
        update: {
          allowedValues: this.mapUpdateEnumTypeValues(allowedValues),
          name,
        },
        where,
      })
    ).enumTypes[0]
  }

  private mapCreateEnumTypeValues(
    enumTypeValues: Array<IEnumTypeValueDTO>,
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
    enumTypeValues: Array<IEnumTypeValueDTO>,
  ): Array<OGM_TYPES.EnumTypeAllowedValuesUpdateFieldInput> {
    return enumTypeValues.map(({ id, ...enumTypeValue }) => ({
      ...whereNodeId(id),
      update: {
        node: enumTypeValue,
      },
    }))
  }
}
