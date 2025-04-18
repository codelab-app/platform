import type { INodeType, IResourceDto } from '@codelab/shared-abstract-core'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import {
  ResourceFragment,
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared-infra-gqlgen'
import {
  resourceApi,
  resourceMapper,
} from '@codelab/shared-domain-module-resource'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResourceRepository extends AbstractRepository<
  INodeType.Resource,
  IResourceDto,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
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
    } = await resourceApi().UpdateResources({
      update: resourceMapper.toUpdateInput(resource),
      where,
    })

    return resources[0]
  }
}
