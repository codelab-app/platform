import type { IArrayTypeDto } from '@codelab/shared/abstract/core'
import type {
  ArrayType,
  ArrayTypeOptions,
  ArrayTypeWhere,
} from '@codelab/shared/infra/gql'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { ArrayTypeFragment } from '@codelab/shared/infra/gql'
import {
  arrayTypeMapper,
  createTypeApi,
  findTypeApi,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ArrayTypeRepository extends AbstractRepository<
  IArrayTypeDto,
  ArrayTypeFragment,
  ArrayTypeWhere,
  ArrayTypeOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  async _find({
    options,
    where,
  }: {
    where?: ArrayTypeWhere
    options?: ArrayTypeOptions
  }) {
    const { types } = await findTypeApi().GetArrayTypes({
      options,
      where,
    })

    return types
  }

  protected async _addMany(arrayTypes: Array<IArrayTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateArrayTypes({
      input: arrayTypes.map((arrayType) =>
        arrayTypeMapper.toCreateInput(arrayType),
      ),
    })

    return types
  }

  protected async _update(arrayType: IArrayTypeDto, where: ArrayTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateArrayTypes({
      update: arrayTypeMapper.toUpdateInput(arrayType),
      where,
    })

    return types[0]
  }
}
