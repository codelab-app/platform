import type {
  INodeType,
  IReactNodeTypeDto,
} from '@codelab/shared/abstract/core'
import type {
  ReactNodeType,
  ReactNodeTypeOptions,
  ReactNodeTypeWhere,
} from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { ReactNodeTypeFragment } from '@codelab/shared/infra/gql'
import {
  createTypeApi,
  findTypeApi,
  reactNodeTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReactNodeTypeRepository extends AbstractRepository<
  INodeType.ReactNodeType,
  IReactNodeTypeDto,
  ReactNodeTypeFragment,
  ReactNodeTypeWhere,
  ReactNodeTypeOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(reactNodeTypes: Array<IReactNodeTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateReactNodeTypes({
      input: reactNodeTypes.map((reactNodeType) =>
        reactNodeTypeMapper.toCreateInput(reactNodeType),
      ),
    })

    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ReactNodeTypeWhere
    options?: ReactNodeTypeOptions
  }) {
    const { types } = await findTypeApi().GetReactNodeTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(
    reactNodeType: IReactNodeTypeDto,
    where: ReactNodeTypeWhere,
  ) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateReactNodeTypes({
      update: reactNodeTypeMapper.toUpdateInput(reactNodeType),
      where,
    })

    return types[0]
  }
}
