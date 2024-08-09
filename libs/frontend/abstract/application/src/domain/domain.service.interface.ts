import type {
  ICreateDomainData,
  IDomainModel,
} from '@codelab/frontend/abstract/domain'
import type { DomainOptions, DomainWhere } from '@codelab/shared/infra/gql'
import type { ICRUDService, IQueryService } from '../services'

export interface IDomainService
  extends ICRUDService<IDomainModel, ICreateDomainData, ICreateDomainData>,
    Omit<IQueryService<IDomainModel, DomainWhere, DomainOptions>, 'getOne'> {
  getAll(where?: DomainWhere): Promise<Array<IDomainModel>>
}
