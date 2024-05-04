import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import type { IProductionDomainService } from './production-domain.service.interface'

@model('@codelab/ProductionDomainService')
export class ProductionDomainService
  extends Model({})
  implements IProductionDomainService
{
  @modelFlow
  create = _async(function* (this: ProductionDomainService, name: string) {
    return yield* _await(
      fetch(`/api/production-domains/${name}`, { method: 'POST' }),
    )
  })

  @modelFlow
  delete = _async(function* (this: ProductionDomainService, name: string) {
    return yield* _await(
      fetch(`/api/production-domains/${name}`, { method: 'DELETE' }),
    )
  })

  @modelFlow
  update = _async(function* (
    this: ProductionDomainService,
    oldName: string,
    newName: string,
  ) {
    return yield* _await(
      fetch(`/api/production-domains/${newName}`, {
        body: JSON.stringify({ oldName }),
        method: 'PATCH',
      }),
    )
  })
}
