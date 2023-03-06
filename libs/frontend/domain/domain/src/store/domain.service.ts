import type {
  ICreateDomainData,
  IDomain,
  IDomainDTO,
  IDomainService,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { DomainWhere } from '@codelab/shared/abstract/codegen'
import { connectNodeId } from '@codelab/shared/domain/mapper'
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
import { domainApis } from './domain.api'
import { Domain } from './domain.model'
import { DomainModalService } from './domain-modal.service'

@model('@codelab/DomainService')
export class DomainService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new DomainModalService({})),
    domains: prop(() => objectMap<Domain>()),
    updateModal: prop(() => new DomainModalService({})),
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
    const { domains } = yield* _await(domainApis.GetDomains({ where }))

    if (clearDomain) {
      this.domains.clear()
    }

    return domains.map((domain) => {
      const domainModel = Domain.create(domain)

      this.domains.set(domain.id, domainModel)

      return domainModel
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
    { id, app, name }: ICreateDomainData,
  ) {
    const domain = Domain.create({
      app,
      domainConfig: {
        misconfigured: true,
      },
      id,
      name,
      projectDomain: {
        verified: false,
      },
    })

    this.domains.set(domain.id, domain)

    const {
      createDomains: { domains },
    } = yield* _await(
      domainApis.CreateDomains({
        input: {
          app: connectNodeId(app.id),
          id,
          name,
        },
      }),
    )

    return domain
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: DomainService, domain: IDomain) {
    const { id } = domain

    this.domains.delete(id)

    const {
      deleteDomains: { nodesDeleted },
    } = yield* _await(domainApis.DeleteDomains({ where: { id } }))

    return domain!
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: DomainService,
    { id, name }: IUpdateDomainData,
  ) {
    const domain = this.domains.get(id)

    domain?.writeCache({ name })

    const {
      updateDomains: { domains },
    } = yield* _await(
      domainApis.UpdateDomains({
        update: {
          name,
        },
        where: {
          id,
        },
      }),
    )

    return domain!
  })
}
