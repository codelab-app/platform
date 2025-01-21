import type { IDomainDto, INodeType } from '@codelab/shared/abstract/core'
import type { DomainOptions, DomainWhere } from '@codelab/shared/infra/gqlgen'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { DomainFragment } from '@codelab/shared/infra/gqlgen'
import { domainApi, domainMapper } from '@codelab/shared-domain-module/domain'
import { Injectable } from '@nestjs/common'

const { CreateDomains, DomainList, UpdateDomains } = domainApi()

@Injectable()
export class DomainRepository extends AbstractRepository<
  INodeType.Domain,
  IDomainDto,
  DomainFragment,
  DomainWhere,
  DomainOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(domainsDto: Array<IDomainDto>) {
    const {
      createDomains: { domains },
    } = await CreateDomains({
      input: domainsDto.map((domain) => domainMapper.toCreateInput(domain)),
    })

    return domains
  }

  protected async _find({
    options,
    where,
  }: {
    where?: DomainWhere
    options?: DomainOptions
  }) {
    const { items: domains } = await DomainList({
      options,
      where,
    })

    return domains
  }

  protected async _update({ id, name }: IDomainDto, where: DomainWhere) {
    const {
      updateDomains: { domains },
    } = await UpdateDomains({
      update: {
        name,
      },
      where,
    })

    return domains[0]
  }
}
