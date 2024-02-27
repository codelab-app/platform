import type {
  ICreateDomainData,
  IDomainModel,
} from '@codelab/frontend/abstract/domain'
import type {
  DomainFragment,
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../services'

export interface IDomainService
  extends ICRUDService<IDomainModel, ICreateDomainData, ICreateDomainData>,
    Omit<IQueryService<IDomainModel, DomainWhere, DomainOptions>, 'getOne'>,
    ICRUDModalService<Ref<IDomainModel>, { domain?: IDomainModel }> {
  createModal: IModalService
  domains: ObjectMap<IDomainModel>
  domainsList: Array<IDomainModel>
  getAll(where?: DomainWhere): Promise<Array<IDomainModel>>
  hydrate(domain: DomainFragment): void
}
