import type {
  IApplicationStore,
  IRootStore,
  IRouterProps,
} from '@codelab/frontend/abstract/application'
import { IDomainStore } from '@codelab/frontend/abstract/domain'
import { IUserDto } from '@codelab/shared/abstract/core'
import {
  Model,
  model,
  prop,
  registerRootStore,
  setGlobalConfig,
} from 'mobx-keystone'
import { createApplicationStore } from './application.store'
import { createDomainStore } from './domain.store'

export const createRootStore = (user: IUserDto, routerProps: IRouterProps) => {
  setGlobalConfig({
    showDuplicateModelNameWarnings: false,
  })

  const domainStore = createDomainStore(user)
  const applicationStore = createApplicationStore({ params: {}, query: {} })

  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      applicationStore: prop<IApplicationStore>(() => applicationStore),
      domainStore: prop<IDomainStore>(() => domainStore),
    })
    implements IRootStore {}

  const rootStore = new RootStore({})

  registerRootStore(rootStore)

  return rootStore
}
