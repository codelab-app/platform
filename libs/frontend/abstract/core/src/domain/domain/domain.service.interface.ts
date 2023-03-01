import type {
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { ICreateDomainData, IDomainDTO } from './domain.dto.interface'
import type { IDomain } from './domain.model.interface'

export interface IDomainService
  extends ICRUDService<IDomain, ICreateDomainData, ICreateDomainData>,
    Omit<
      IQueryService<IDomain, DomainWhere, DomainOptions>,
      'getAll' | 'getOne'
    >,
    ICRUDModalService<Ref<IDomain>, { domain: Maybe<IDomain> }> {
  domains: ObjectMap<IDomain>
  domainsList: Array<IDomain>
  createModal: ICRUDModalService<
    Ref<IDomain>,
    { domain: Maybe<string> }
  >['createModal']
  getAll(where?: DomainWhere): Promise<Array<IDomain>>
}
