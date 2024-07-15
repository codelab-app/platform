import type {
  Domain,
  DomainOptions,
  DomainWhere,
} from '@codelab/backend/abstract/codegen'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  domainSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IDomainDto } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DomainRepository extends AbstractRepository<
  IDomainDto,
  Domain,
  DomainWhere,
  DomainOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(domains: Array<IDomainDto>) {
    return (
      await (
        await this.ogmService.Domain
      ).create({
        input: domains.map(({ app, id, name }) => ({
          app: connectNodeId(app.id),
          compositeKey: '',
          id,
          name,
        })),
      })
    ).domains
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
      selectionSet: `{ ${domainSelectionSet} }`,
      where,
    })
  }

  protected async _update({ id, name }: IDomainDto, where: DomainWhere) {
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
