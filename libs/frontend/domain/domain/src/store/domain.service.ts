import type {
  ICreateDomainData,
  IDomain,
  IDomainDTO,
  IDomainService,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/core'
import { VercelService } from '@codelab/frontend/domain/vercel'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { DomainWhere } from '@codelab/shared/abstract/codegen'
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
// import { vercelApis } from '../../../vercel/src'
import { DomainRepository } from '../services'
import { Domain } from './domain.model'
import { DomainModalService } from './domain-modal.service'

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
  @modelFlow
  @transaction
  getAll = _async(function* (
    this: DomainService,
    where?: DomainWhere,
    clearDomain?: boolean,
  ) {
    const domainFragments = yield* _await(
      this.domainRepository.find(where || {}),
    )

    if (clearDomain) {
      this.domains.clear()
    }

    return domainFragments.map((domainFragment) => {
      const domain = this.add(domainFragment)

      return domain
    })
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
  delete = _async(function* (this: DomainService, domain: IDomain) {
    const { id } = domain

    this.domains.delete(id)

    yield* _await(this.domainRepository.delete([domain]))
    yield* _await(this.vercelService.delete(domain.name))

    return domain
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: DomainService,
    { id, name }: IUpdateDomainData,
  ) {
    const domain = this.domains.get(id)!

    domain.writeCache({ name })

    yield* _await(this.domainRepository.update(domain))

    // Fetching again to get the backend-generated
    // domainConfig and projectDomain
    return (yield* _await(this.getAll({ id: domain.id })))[0] || domain
  })
}
