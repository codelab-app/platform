import type {
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { ICreateDomainData } from './domain.dto.interface'
import type { IDomainModel } from './domain.model.interface'

export interface IDomainService
  extends ICRUDService<IDomainModel, ICreateDomainData, ICreateDomainData>,
    Omit<IQueryService<IDomainModel, DomainWhere, DomainOptions>, 'getOne'>,
    ICRUDModalService<Ref<IDomainModel>, { domain: Maybe<IDomainModel> }> {
  createModal: ICRUDModalService<
    Ref<IDomainModel>,
    { domain: Maybe<string> }
  >['createModal']
  domains: ObjectMap<IDomainModel>
  domainsList: Array<IDomainModel>
  getAll(where?: DomainWhere): Promise<Array<IDomainModel>>
}
