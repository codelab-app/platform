import type {
  INodeType,
  IPrimitiveTypeDto,
} from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import type {
  PrimitiveTypeOptions,
  PrimitiveTypeWhere,
} from '@codelab/shared/infra/gql'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { PrimitiveTypeFragment } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  createTypeApi,
  findTypeApi,
  primitiveTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrimitiveTypeRepository extends AbstractRepository<
  INodeType.PrimitiveType,
  IPrimitiveTypeDto,
  PrimitiveTypeFragment,
  PrimitiveTypeWhere,
  PrimitiveTypeOptions
> {
  constructor(

    protected override loggerService: PinoLoggerService,
    protected authService: AuthDomainService,
  ) {
    super(loggerService)
  }

  protected async _addMany(primitiveTypes: Array<IPrimitiveTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreatePrimitiveTypes({
      input: primitiveTypes.map((primitiveType) =>
        primitiveTypeMapper.toCreateInput(primitiveType),
      ),
    })

    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PrimitiveTypeWhere
    options?: PrimitiveTypeOptions
  }) {
    const { types } = await findTypeApi().GetPrimitiveTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(
    primitiveType: IPrimitiveTypeDto,
    where: BaseTypeUniqueWhere,
  ) {
    const {
      types: { types },
    } = await updateTypeApi().UpdatePrimitiveTypes({
      update: primitiveTypeMapper.toUpdateInput(primitiveType),
      where,
    })

    return types[0]
  }
}
