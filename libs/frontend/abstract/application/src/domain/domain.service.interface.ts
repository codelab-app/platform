import type {
  ICreateDomainData,
  IDomainModel,
} from '@codelab/frontend/abstract/domain'
import type {
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { ObjectMap } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../services'

export interface IDomainService
  extends ICRUDService<IDomainModel, ICreateDomainData, ICreateDomainData>,
    Omit<IQueryService<IDomainModel, DomainWhere, DomainOptions>, 'getOne'>,
    ICRUDModalService<IDomainModel, { domain?: IDomainModel }> {
  createModal: IModalService
  domains: ObjectMap<IDomainModel>
  domainsList: Array<IDomainModel>
  getAll(where?: DomainWhere): Promise<Array<IDomainModel>>
}
