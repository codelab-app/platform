import type {
  ICreateDomainData,
  IDomainModel,
} from '@codelab/frontend/abstract/domain'
import type {
  DomainFragment,
  DomainOptions,
  DomainWhere,
} from '@codelab/frontend/infra/gql'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ICRUDService, IModalService, IQueryService } from '../services'

export interface IDomainService
  extends ICRUDService<IDomainModel, ICreateDomainData, ICreateDomainData>,
    Omit<IQueryService<IDomainModel, DomainWhere, DomainOptions>, 'getOne'> {
  getAll(where?: DomainWhere): Promise<Array<IDomainModel>>
}
