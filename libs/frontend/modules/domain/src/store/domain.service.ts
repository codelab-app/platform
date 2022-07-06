import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { DomainWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreateDomainDTO,
  IDomainService,
  IUpdateDomainDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
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
    const { domains } = yield* _await(domainApis.GetDomain({ where }))

    if (clearDomain) {
      this.domains.clear()
    }

    return domains.map((domain) => {
      const domainModel = Domain.hydrate(domain as any)

      this.domains.set(domain.id, domainModel)

      return domainModel
    })
  })

  @computed
  get domainsList() {
    return [...this.domains.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (this: DomainService, data: ICreateDomainDTO) {
    const { appId, name } = data

    const input = {
      appId,
      name,
    }

    const { createDomain: domain } = yield* _await(
      domainApis.CreateDomain({ input }),
    )

    if (!domain) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Domain was not created')
    }

    const domainModel = Domain.hydrate(domain as any)
    this.domains.set(domainModel.id, domainModel)
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: DomainService, id: string) {
    const { deleteDomain } = yield* _await(domainApis.DeleteDomain({ id }))
    const domain = throwIfUndefined(this.domains.get(id))

    if (deleteDomain.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Domain was not deleted')
    }

    this.domains.delete(id)

    return domain
  })

  @modelFlow
  @transaction
  update = _async(function* (this: DomainService, input: IUpdateDomainDTO) {
    const { updateDomain } = yield* _await(domainApis.UpdateDomain({ input }))
    const domainModel = Domain.hydrate(updateDomain as any)

    this.domains.set(updateDomain.id, domainModel)
  })
}
