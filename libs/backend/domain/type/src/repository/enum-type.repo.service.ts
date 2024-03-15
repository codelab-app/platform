import type {
  EnumType,
  EnumTypeAllowedValuesFieldInput,
  EnumTypeAllowedValuesUpdateFieldInput,
  EnumTypeOptions,
  EnumTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  exportEnumTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'

import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type {
  IEnumTypeDto,
  IEnumTypeValueDto,
} from '@codelab/shared/abstract/core'
import { connectOwner, whereNodeId } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EnumTypeRepository extends AbstractRepository<
  IEnumTypeDto,
  EnumType,
  EnumTypeWhere,
  EnumTypeOptions
> {
  constructor(
    private ogmService: OgmService,

    protected validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
    private authService: AuthDomainService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(enumTypes: Array<IEnumTypeDto>) {
    return (
      await (
        await this.ogmService.EnumType
      ).create({
        input: enumTypes.map(({ __typename, allowedValues, ...enumType }) => ({
          ...enumType,
          allowedValues: this.mapCreateEnumTypeValues(allowedValues),
          owner: connectOwner(this.authService.currentUser),
        })),
      })
    ).enumTypes
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
      selectionSet: `{ ${exportEnumTypeSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { __typename, allowedValues, id, name, ...enumType }: IEnumTypeDto,
    where: EnumTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.EnumType
      ).update({
        update: {
          allowedValues: this.mapUpdateEnumTypeValues(allowedValues),
          name,
        },
        where,
      })
    ).enumTypes[0]
  }

  private mapCreateEnumTypeValues(
    enumTypeValues: Array<IEnumTypeValueDto>,
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
    enumTypeValues: Array<IEnumTypeValueDto>,
  ): Array<EnumTypeAllowedValuesUpdateFieldInput> {
    return enumTypeValues.map(({ id, ...enumTypeValue }) => ({
      ...whereNodeId(id),
      update: {
        node: enumTypeValue,
      },
    }))
  }
}
