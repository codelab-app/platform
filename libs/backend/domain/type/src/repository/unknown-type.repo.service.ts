import type { INodeType, IUnknownTypeDto } from '@codelab/shared-abstract-core'
import type {
  IBaseTypeWhere,
  UnknownTypeFragment,
  UnknownTypeOptions,
  UnknownTypeWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import {
  createTypeApi,
  findTypeApi,
  unknownTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module-type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UnknownTypeRepository extends AbstractRepository<
  INodeType.UnknownType,
  IUnknownTypeDto,
  UnknownTypeFragment,
  UnknownTypeWhere,
  UnknownTypeOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(unknownTypes: Array<IUnknownTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateUnknownTypes({
      input: unknownTypes.map((unknownType) =>
        unknownTypeMapper.toCreateInput(unknownType),
      ),
    })
    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: UnknownTypeWhere
    options?: UnknownTypeOptions
  }) {
    const { types } = await findTypeApi().GetUnknownTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(unknownType: IUnknownTypeDto, where: IBaseTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateUnknownTypes({
      update: unknownTypeMapper.toUpdateInput(unknownType),
      where,
    })

    return types[0]
  }
}
