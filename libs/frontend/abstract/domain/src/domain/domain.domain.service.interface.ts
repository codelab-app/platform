import type {
  DomainFragment,
  DomainOptions,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import type { IDomainDto } from '@codelab/shared/abstract/core'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ICreateDomainData } from './domain.dto.interface'
import type { IDomainModel } from './domain.model.interface'

export interface IDomainDomainService {
  // createModal: IModalService
  domains: ObjectMap<IDomainModel>
  domainsList: Array<IDomainModel>
  // getAll(where?: DomainWhere): Promise<Array<IDomainModel>>
  hydrate(domain: IDomainDto): IDomainModel
}
