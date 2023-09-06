import type {
  EnumType,
  EnumTypeAllowedValuesFieldInput,
  EnumTypeAllowedValuesUpdateFieldInput,
  EnumTypeOptions,
  EnumTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportEnumTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type {
  IEnumTypeDTO,
  IEnumTypeValueDTO,
} from '@codelab/shared/abstract/core'
import { connectAuth0Owner, whereNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EnumTypeRepository extends AbstractRepository<
  IEnumTypeDTO,
  EnumType,
  EnumTypeWhere,
  EnumTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _find({
    options,
    where,
  }: {
    where?: EnumTypeWhere
    options?: EnumTypeOptions
  }) {
    return await (
      await this.ogmService.EnumType
    ).find({
      options,
      selectionSet: exportEnumTypeSelectionSet,
      where,
    })
  }

  protected async _add(enumTypes: Array<IEnumTypeDTO>) {
    return (
      await (
        await this.ogmService.EnumType
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
        await this.ogmService.EnumType
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
