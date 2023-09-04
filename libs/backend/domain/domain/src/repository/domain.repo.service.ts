import type {
  Domain,
  DomainOptions,
  DomainWhere,
} from '@codelab/backend/abstract/codegen'
import {
  domainSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IDomainDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DomainRepository extends AbstractRepository<
  IDomainDTO,
  Domain,
  DomainWhere,
  DomainOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
  ) {
    super(traceService)
  }

  protected async _find({
    options,
    where,
  }: {
    where?: DomainWhere
    options?: DomainOptions
  }) {
    return await (
      await this.ogmService.Domain
    ).find({
      options,
      selectionSet: domainSelectionSet,
      where,
    })
  }

  protected async _add(domains: Array<IDomainDTO>) {
    return (
      await (
        await this.ogmService.Domain
      ).create({
        input: domains.map(({ id, name }) => ({
          id,
          name,
        })),
      })
    ).domains
  }

  protected async _update({ id, name }: IDomainDTO, where: DomainWhere) {
    return (
      await (
        await this.ogmService.Domain
      ).update({
        update: {
          name,
        },
        where,
      })
    ).domains[0]
  }
}
