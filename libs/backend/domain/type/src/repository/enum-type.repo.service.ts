import type {
  EnumType,
  EnumTypeAllowedValuesFieldInput,
  EnumTypeAllowedValuesUpdateFieldInput,
  EnumTypeOptions,
  EnumTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type {
  IEnumTypeDto,
  IEnumTypeValueDto,
} from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { EnumTypeFragment } from '@codelab/shared/infra/gql'
import {
  createTypeApi,
  enumTypeMapper,
  findTypeApi,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EnumTypeRepository extends AbstractRepository<
  IEnumTypeDto,
  EnumTypeFragment,
  EnumTypeWhere,
  EnumTypeOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(enumTypes: Array<IEnumTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi.CreateEnumTypes({
      input: enumTypes.map((enumType) =>
        enumTypeMapper.toCreateInput(enumType),
      ),
    })

    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: EnumTypeWhere
    options?: EnumTypeOptions
  }) {
    const { types } = await findTypeApi.GetEnumTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(enumType: IEnumTypeDto, where: EnumTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi.UpdateEnumTypes({
      update: enumTypeMapper.toUpdateInput(enumType),
      where,
    })

    return types[0]
  }
}
