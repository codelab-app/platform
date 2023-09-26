import {
  type Resource,
  type ResourceOptions,
  type ResourceWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  OgmService,
  resourceSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IResourceDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, connectOwner } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResourceRepository extends AbstractRepository<
  IResourceDTO,
  Resource,
  ResourceWhere,
  ResourceOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
  }

  protected async _add(resources: Array<IResourceDTO>) {
    return (
      await (
        await this.ogmService.Resource
      ).create({
        input: resources.map(({ config, id, name, type }) => ({
          config: connectNodeId(config.id),
          id,
          name,
          owner: connectOwner(this.authService.currentUser),
        })),
      })
    ).resources
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ResourceWhere
    options?: ResourceOptions
  }) {
    return await (
      await this.ogmService.Resource
    ).find({
      options,
      selectionSet: `{ ${resourceSelectionSet} }`,
      where,
    })
  }

  protected async _update({ name, type }: IResourceDTO) {
    return (
      await (
        await this.ogmService.Resource
      ).update({
        update: {
          name,
        },
      })
    ).resources[0]
  }
}
