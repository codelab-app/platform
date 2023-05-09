import type {
  EnumType,
  EnumTypeAllowedValuesFieldInput,
  EnumTypeAllowedValuesUpdateFieldInput,
  EnumTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportEnumTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type {
  IEnumTypeDTO,
  IEnumTypeValueDTO,
} from '@codelab/shared/abstract/core'
import { connectAuth0Owner, whereNodeId } from '@codelab/shared/domain/mapper'

export class EnumTypeRepository extends AbstractRepository<
  IEnumTypeDTO,
  EnumType,
  EnumTypeWhere
> {
  private EnumType = Repository.instance.EnumType

  async _find(where: EnumTypeWhere) {
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
    where: EnumTypeWhere,
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
  ): EnumTypeAllowedValuesFieldInput {
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
  ): Array<EnumTypeAllowedValuesUpdateFieldInput> {
    return enumTypeValues.map(({ id, ...enumTypeValue }) => ({
      ...whereNodeId(id),
      update: {
        node: enumTypeValue,
      },
    }))
  }
}
