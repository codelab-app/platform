import type { IResourceDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  ResourceFragment,
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/infra/gql'
import {
  resourceApi,
  resourceMapper,
} from '@codelab/shared-domain-module/resource'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResourceRepository extends AbstractRepository<
  IResourceDto,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(resources: Array<IResourceDto>) {
    const {
      createResources: { resources: createdResources },
    } = await resourceApi().CreateResources({
      input: resources.map((resource) =>
        resourceMapper.toCreateInput(resource),
      ),
    })

    return createdResources
  }

  protected async _find(params: {
    where?: ResourceWhere
    options?: ResourceOptions
  }) {
    const { items } = await resourceApi().ResourceList(params)

    return items
  }

  protected async _update(resource: IResourceDto, where: ResourceWhere) {
    const {
      updateResources: { resources },
    } = await resourceApi().UpdateResource({
      update: resourceMapper.toUpdateInput(resource),
      where,
    })

    return resources[0]
  }
}
