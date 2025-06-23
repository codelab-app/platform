import type { IArrayTypeDto, INodeType } from '@codelab/shared-abstract-core'
import type {
  ArrayTypeOptions,
  ArrayTypeWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import {
  arrayTypeMapper,
  createTypeApi,
  findTypeApi,
  updateTypeApi,
} from '@codelab/shared-domain-module-type'
import { ArrayTypeFragment } from '@codelab/shared-infra-gqlgen'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ArrayTypeRepository extends AbstractRepository<
  INodeType.ArrayType,
  IArrayTypeDto,
  ArrayTypeFragment,
  ArrayTypeWhere,
  ArrayTypeOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
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
