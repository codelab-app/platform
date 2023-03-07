import type {
  IDomain,
  IDomainRepository,
} from '@codelab/frontend/abstract/core'
import type { DomainWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { domainApis } from '../store'

@model('@codelab/DomainRepository')
export class DomainRepository extends Model({}) implements IDomainRepository {
  @modelFlow
  add = _async(function* (this: DomainRepository, domain: IDomain) {
    const {
      createDomains: { domains },
    } = yield* _await(
      domainApis.CreateDomains({
        input: domain.toCreateInput(),
      }),
    )

    return domains[0]!
  })

  @modelFlow
  update = _async(function* (this: DomainRepository, domain: IDomain) {
    const {
      updateDomains: { domains },
    } = yield* _await(
      domainApis.UpdateDomains({
        update: domain.toUpdateInput(),
        where: { id: domain.id },
      }),
    )

    return domains[0]!
  })

  @modelFlow
  find = _async(function* (this: DomainRepository, where: DomainWhere) {
    const { domains } = yield* _await(domainApis.GetDomains({ where }))

    return domains
  })

  @modelFlow
  delete = _async(function* (this: DomainRepository, domains: Array<IDomain>) {
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
}
