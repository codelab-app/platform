import type { IAnyTypeDto, INodeType } from '@codelab/shared-abstract-core'
import type {
  AnyTypeFragment,
  AnyTypeOptions,
  AnyTypeWhere,
  IBaseTypeWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import {
  anyTypeMapper,
  createTypeApi,
  findTypeApi,
  updateTypeApi,
} from '@codelab/shared-domain-module-type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnyTypeRepository extends AbstractRepository<
  INodeType.AnyType,
  IAnyTypeDto,
  AnyTypeFragment,
  AnyTypeWhere,
  AnyTypeOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(anyTypes: Array<IAnyTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateAnyTypes({
      input: anyTypes.map((anyType) => anyTypeMapper.toCreateInput(anyType)),
    })
    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: AnyTypeWhere
    options?: AnyTypeOptions
  }) {
    const { types } = await findTypeApi().GetAnyTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(anyType: IAnyTypeDto, where: IBaseTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateAnyTypes({
      update: anyTypeMapper.toUpdateInput(anyType),
      where,
    })

    return types[0]
  }
}
