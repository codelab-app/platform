import type {
  IApplicationStore,
  IRootStore,
} from '@codelab/frontend-abstract-application'
import type { IDomainStore } from '@codelab/frontend-abstract-domain'
import type { IUserDto } from '@codelab/shared-abstract-core'

import {
  Model,
  model,
  modelAction,
  prop,
  registerRootStore,
  setGlobalConfig,
  undoMiddleware,
} from 'mobx-keystone'

import { createApplicationStore } from './application.store'
import { createDomainStore } from './domain.store'

export const createRootStore = () => {
  setGlobalConfig({
    showDuplicateModelNameWarnings: false,
  })

  const domainStore = createDomainStore()
  const applicationStore = createApplicationStore(domainStore)

  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      applicationStore: prop<IApplicationStore>(() => applicationStore),
      domainStore: prop<IDomainStore>(() => domainStore),
    })
    implements IRootStore
  {
    @modelAction
    setUser(userDto: IUserDto) {
      this.domainStore.userDomainService.setCurrentUser(userDto)
    }
  }

  const rootStore = new RootStore({})

  const undoManager = undoMiddleware(rootStore, undefined, {
    maxUndoLevels: 1,
  })

  registerRootStore(rootStore)

  return { rootStore, undoManager }
}
