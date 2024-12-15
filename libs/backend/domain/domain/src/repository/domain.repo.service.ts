import type { IDomainDto } from '@codelab/shared/abstract/core'
import type {
  Domain,
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/infra/gql'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectNodeId } from '@codelab/shared/domain/orm'
import { DomainFragment } from '@codelab/shared/infra/gql'
import { domainApi, domainMapper } from '@codelab/shared-domain-module/domain'
import { Injectable } from '@nestjs/common'

const { CreateDomains, DomainList, UpdateDomains } = domainApi()

@Injectable()
export class DomainRepository extends AbstractRepository<
  IDomainDto,
  DomainFragment,
  DomainWhere,
  DomainOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
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
