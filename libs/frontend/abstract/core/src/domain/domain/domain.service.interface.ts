import { DomainOptions, DomainWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import { ICreateDomainDTO, IDomainDTO } from './domain.dto.interface'
import { IDomain } from './domain.model.interface'

export interface IDomainService
  extends ICRUDService<IDomain, ICreateDomainDTO, ICreateDomainDTO>,
    ICacheService<IDomainDTO, IDomain>,
    Omit<
      IQueryService<IDomain, DomainWhere, DomainOptions>,
      'getAll' | 'getOne'
    >,
    ICacheService<IDomainDTO, IDomain>,
    ICRUDModalService<Ref<IDomain>, { domain: Maybe<IDomain> }> {
  domains: ObjectMap<IDomain>
  domainsList: Array<IDomain>
  createModal: ICRUDModalService<
    Ref<IDomain>,
    { domain: Maybe<string> }
  >['createModal']
  getAll(where?: DomainWhere): Promise<Array<IDomain>>
}
