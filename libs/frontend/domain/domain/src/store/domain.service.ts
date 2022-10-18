import {
  ICreateDomainDTO,
  IDomainDTO,
  IDomainService,
  IUpdateDomainDTO,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import {
  DomainCreateInput,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import { IEntity } from '@codelab/shared/abstract/types'
import { connectNode } from '@codelab/shared/data'
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
import { v4 } from 'uuid'
import { domainApis } from './domain.api'
import { Domain } from './domain.model'
import { DomainModalService } from './domain-modal.service'

@model('@codelab/DomainService')
export class DomainService
  extends Model({
    domains: prop(() => objectMap<Domain>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new DomainModalService({})),
    deleteModal: prop(() => new DomainModalService({})),
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
      const domainModel = Domain.hydrate(domain)

      this.domains.set(domain.id, domainModel)

      return domainModel
    })
  })

  @modelAction
  writeCache = (domain: IDomainDTO) => {
    let domainModel = this.domains.get(domain.id)

    domainModel = domainModel
      ? domainModel.writeCache(domain)
      : Domain.hydrate(domain)

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
    data: Array<ICreateDomainDTO>,
  ) {
    const input: Array<DomainCreateInput> = data.map((domain) => ({
      id: domain.id ?? v4(),
      app: connectNode(domain.appId),
      name: domain.name,
    }))

    const {
      createDomains: { domains },
    } = yield* _await(domainApis.CreateDomains({ input }))

    return domains.map((domain) => this.writeCache(domain))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: DomainService, ids: Array<string>) {
    ids.forEach((id) => this.domains.delete(id))

    const {
      deleteDomains: { nodesDeleted },
    } = yield* _await(domainApis.DeleteDomains({ where: { id_IN: ids } }))

    return nodesDeleted
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: DomainService,
    entity: IEntity,
    input: IUpdateDomainDTO,
  ) {
    const {
      updateDomains: { domains },
    } = yield* _await(
      domainApis.UpdateDomains({
        where: {
          id: entity.id,
        },
        update: {
          name: input.name,
        },
      }),
    )

    return domains.map((domain) => this.writeCache(domain))
  })
}
