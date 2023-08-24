import type {
  Resource,
  ResourceOptions,
  ResourceWhere,
} from '@codelab/backend/abstract/codegen'
import type { OGMService } from '@codelab/backend/infra/adapter/neo4j'
import { resourceSelectionSet } from '@codelab/backend/infra/adapter/neo4j'
import type { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IResourceDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'

export class ResourceRepository extends AbstractRepository<
  IResourceDTO,
  Resource,
  ResourceWhere,
  ResourceOptions
> {
  constructor(
    private ogmService: OGMService,
    protected traceService: TraceService,
  ) {
    super(traceService)
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
      selectionSet: resourceSelectionSet,
      where,
    })
  }

  protected async _add(resources: Array<IResourceDTO>) {
    return (
      await (
        await this.ogmService.Resource
      ).create({
        input: resources.map(({ id, name, owner, type }) => ({
          id,
          name,
          owner: connectAuth0Owner(owner),
          type,
        })),
      })
    ).resources
  }

  protected async _update({ name, type }: IResourceDTO) {
    return (
      await (
        await this.ogmService.Resource
      ).update({
        selectionSet: resourceSelectionSet,
        update: {
          name,
          type,
        },
      })
    ).resources[0]
  }
}
