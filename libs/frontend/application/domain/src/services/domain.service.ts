import type { IDomainService } from '@codelab/frontend/abstract/application'
import type {
  ICreateDomainData,
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/application/shared/store'
import { Domain } from '@codelab/frontend/domain/domain'
import { VercelService } from '@codelab/frontend/domain/vercel'
import type { DomainWhere } from '@codelab/shared/abstract/codegen'
import type { IDomainDTO } from '@codelab/shared/abstract/core'
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
import { DomainModalService } from './domain-modal.service'
import { DomainRepository } from './index'

@model('@codelab/DomainService')
export class DomainService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new DomainModalService({})),
    domainRepository: prop(() => new DomainRepository({})),
    domains: prop(() => objectMap<Domain>()),
    updateModal: prop(() => new DomainModalService({})),
    vercelService: prop(() => new VercelService({})),
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
    const domain = this.add({
      ...domainData,
      domainConfig: undefined,
      projectDomain: undefined,
    })

    yield* _await(this.vercelService.create(domain.name))
    yield* _await(this.domainRepository.add(domain))

    // Fetching again to get the backend-generated
    // domainConfig and projectDomain
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

      await this.vercelService.delete(domain.name)
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

    return domains.map((domain) => this.add(domain))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: DomainService,
    { id, name }: IUpdateDomainData,
  ) {
    const domain = this.domains.get(id)!
    const oldName = domain.name

    domain.writeCache({ name })

    yield* _await(this.vercelService.update(oldName, name))
    yield* _await(this.domainRepository.update(domain))

    // Fetching again to get the backend-generated
    // domainConfig and projectDomain
    return (yield* _await(this.getAll({ id: domain.id })))[0] || domain
  })

  @modelAction
  add = (domain: IDomainDTO) => {
    let domainModel = this.domains.get(domain.id)

    domainModel = domainModel
      ? domainModel.writeCache(domain)
      : Domain.create(domain)

    this.domains.set(domain.id, domainModel)

    return domainModel
  }
}
