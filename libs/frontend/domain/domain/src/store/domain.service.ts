import type {
  ICreateDomainDTO,
  IDomainDTO,
  IDomainService,
  IUpdateDomainDTO,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  DomainCreateInput,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
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
  add = (domain: IDomainDTO) => {
    let domainModel = this.domains.get(domain.id)

    domainModel = domainModel ? domainModel.add(domain) : Domain.hydrate(domain)

    this.domains.set(domain.id, domainModel)

    return domainModel
  }

  @computed
  get domainsList() {
    return [...this.domains.values()]
  }

  @modelFlow
  @transaction
  createSubmit = _async(function* (
    this: DomainService,
    data: Array<ICreateDomainDTO>,
  ) {
    const input: Array<DomainCreateInput> = data.map(({ id, app, name }) => ({
      id,
      app: connectNodeId(app.id),
      name,
    }))

    const {
      createDomains: { domains },
    } = yield* _await(domainApis.CreateDomains({ input }))

    return domains.map((domain) => this.add(domain))
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
    { id, name }: IUpdateDomainDTO,
  ) {
    const {
      updateDomains: { domains },
    } = yield* _await(
      domainApis.UpdateDomains({
        where: {
          id,
        },
        update: {
          name,
        },
      }),
    )

    return domains.map((domain) => this.add(domain))
  })
}
