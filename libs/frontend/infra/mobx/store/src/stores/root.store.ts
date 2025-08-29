import type { IUserDto } from '@codelab/shared-abstract-core'

import {
  builderServiceContext,
  type IApplicationStore,
  type IRootStore,
  rendererServiceContext,
  routerServiceContext,
  runtimeComponentServiceContext,
  runtimeElementServiceContext,
  runtimePageServiceContext,
} from '@codelab/frontend-abstract-application'
import {
  componentDomainServiceContext,
  type IDomainStore,
  userDomainServiceContext,
} from '@codelab/frontend-abstract-domain'
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

    protected onInit(): void {
      builderServiceContext.set(this, this.applicationStore.builderService)
      rendererServiceContext.set(this, this.applicationStore.rendererService)
      routerServiceContext.set(this, this.applicationStore.routerService)
      runtimeComponentServiceContext.set(
        this,
        this.applicationStore.runtimeComponentService,
      )
      runtimeElementServiceContext.set(
        this,
        this.applicationStore.runtimeElementService,
      )
      runtimePageServiceContext.set(
        this,
        this.applicationStore.runtimePageService,
      )

      /**
       * Provides context to self and children. TODO: Perhaps can move all context to root store
       */
      userDomainServiceContext.set(this, domainStore.userDomainService)

      componentDomainServiceContext.set(
        this,
        domainStore.componentDomainService,
      )
    }
  }

  const rootStore = new RootStore({})

  const undoManager = undoMiddleware(rootStore, undefined, {
    maxUndoLevels: 1,
  })

  registerRootStore(rootStore)

  return { rootStore, undoManager }
}
