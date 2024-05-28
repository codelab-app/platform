import type { IDomainRepository } from '@codelab/frontend/abstract/application'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import type {
  DomainOptions,
  DomainUniqueWhere,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { domainApis } from './domain.api'

@model('@codelab/DomainRepository')
export class DomainRepository extends Model({}) implements IDomainRepository {
  @modelFlow
  add = _async(function* (this: DomainRepository, domain: IDomainModel) {
    const {
      createDomains: { domains },
    } = yield* _await(
      domainApis.CreateDomains({
        input: domain.toCreateInput(),
      }),
    )

    const createdDomain = domains[0]

    assertIsDefined(createdDomain)

    return createdDomain
  })

  @modelFlow
  delete = _async(function* (
    this: DomainRepository,
    domains: Array<IDomainModel>,
  ) {
    const {
      deleteDomains: { nodesDeleted },
    } = yield* _await(
      domainApis.DeleteDomains({
        where: {
          id_IN: domains.map((domain) => domain.id),
        },
      }),
    )

    return nodesDeleted
  })

  @modelFlow
  find = _async(function* (
    this: DomainRepository,
    where: DomainWhere = {},
    options?: DomainOptions,
  ) {
    return yield* _await(domainApis.GetDomains({ options, where }))
  })

  @modelFlow
  findOne = _async(function* (
    this: DomainRepository,
    where: DomainUniqueWhere,
  ) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (this: DomainRepository, domain: IDomainModel) {
    const {
      updateDomains: { domains },
    } = yield* _await(
      domainApis.UpdateDomains({
        update: domain.toUpdateInput(),
        where: { id: domain.id },
      }),
    )

    const updatedDomain = domains[0]

    assertIsDefined(updatedDomain)

    return updatedDomain
  })
}
