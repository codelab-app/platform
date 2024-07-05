import type { IDomainService } from '@codelab/frontend/abstract/application'
import type {
  ICreateDomainData,
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { Domain } from '@codelab/frontend-domain-domain/store'
import type { DomainWhere } from '@codelab/shared/abstract/codegen'
import type { IDomainDto } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { DomainRepository } from './domain.repo'
import { DomainModalService } from './domain-modal.service'

@model('@codelab/DomainService')
export class DomainService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new DomainModalService({})),
    domainRepository: prop(() => new DomainRepository()),
    domains: prop(() => objectMap<Domain>()),
    updateModal: prop(() => new DomainModalService({})),
  })
  implements IDomainService
{
  @computed
  get domainsList() {
    return [...this.domains.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: DomainService,
    domainData: ICreateDomainData,
  ) {
    const domain = this.hydrate({
      ...domainData,
      domainConfig: undefined,
    })

    yield* _await(this.domainRepository.add(domain))

    // Fetching again to get the backend-generated domainConfig
    return (yield* _await(this.getAll({ id: domain.id })))[0] || domain
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: DomainService,
    domains: Array<IDomainModel>,
  ) {
    const deleteDomain = async (domain: IDomainModel) => {
      const { id } = domain

      this.domains.delete(id)

      await this.domainRepository.delete([domain])

      return domain
    }

    yield* _await(Promise.all(domains.map((domain) => deleteDomain(domain))))

    return
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: DomainService, where?: DomainWhere) {
    const { items: domains } = yield* _await(this.domainRepository.find(where))

    return domains.map((domain) => this.hydrate(domain))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: DomainService,
    { id, name }: IUpdateDomainData,
  ) {
    const domain = this.domains.get(id)

    assertIsDefined(domain)

    const oldName = domain.name

    domain.writeCache({ name })

    yield* _await(this.domainRepository.update(domain))

    // Fetching again to get the backend-generated domainConfig
    return (yield* _await(this.getAll({ id: domain.id })))[0] || domain
  })

  @modelAction
  hydrate = (domain: IDomainDto) => {
    let domainModel = this.domains.get(domain.id)

    domainModel = domainModel
      ? domainModel.writeCache(domain)
      : Domain.create(domain)

    this.domains.set(domain.id, domainModel)

    return domainModel
  }
}
