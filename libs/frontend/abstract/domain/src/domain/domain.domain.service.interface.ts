import type { IDomainDto } from '@codelab/shared-abstract-core'
import type { ObjectMap } from 'mobx-keystone'

import type { IHydrateable } from '../shared'
import type { IDomainModel } from './domain.model.interface'

export interface IDomainDomainService
  extends IHydrateable<IDomainDto, IDomainModel> {
  domains: ObjectMap<IDomainModel>
  domainsList: Array<IDomainModel>
}
