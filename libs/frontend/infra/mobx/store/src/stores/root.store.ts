import type {
  IApplicationStore,
  IRootStore,
  IRootStoreInput,
} from '@codelab/frontend/abstract/application'

import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  authGuardDomainServiceContext,
  componentDomainServiceContext,
  domainDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  IDomainStore,
  pageDomainServiceContext,
  preferenceDomainServiceContext,
  redirectDomainServiceContext,
  resourceDomainServiceContext,
  storeDomainServiceContext,
  tagDomainServiceContext,
  typeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import {
  Model,
  model,
  prop,
  registerRootStore,
  setGlobalConfig,
  undoMiddleware,
} from 'mobx-keystone'

import { createApplicationStore } from './application.store'
import { createDomainStore } from './domain.store'

export const createRootStore = ({
  preference,
  routerProps,
  user,
}: IRootStoreInput) => {
  console.log('create root store')

  setGlobalConfig({
    showDuplicateModelNameWarnings: false,
  })

  const domainStore = createDomainStore(user, preference)
  const applicationStore = createApplicationStore(routerProps)

  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      applicationStore: prop<IApplicationStore>(() => applicationStore),
      domainStore: prop<IDomainStore>(() => domainStore),
    })
    implements IRootStore
  {
    protected onInit(): void {
      // provided here to be accessible by application store services
      actionDomainServiceContext.set(this, this.domainStore.actionDomainService)
      appDomainServiceContext.set(this, this.domainStore.appDomainService)
      atomDomainServiceContext.set(this, this.domainStore.atomDomainService)
      authGuardDomainServiceContext.set(
        this,
        this.domainStore.authGuardDomainService,
      )
      componentDomainServiceContext.set(
        this,
        this.domainStore.componentDomainService,
      )
      domainDomainServiceContext.set(this, this.domainStore.domainDomainService)
      elementDomainServiceContext.set(
        this,
        this.domainStore.elementDomainService,
      )
      fieldDomainServiceContext.set(this, this.domainStore.fieldDomainService)
      pageDomainServiceContext.set(this, this.domainStore.pageDomainService)
      redirectDomainServiceContext.set(
        this,
        this.domainStore.redirectDomainService,
      )
      resourceDomainServiceContext.set(
        this,
        this.domainStore.resourceDomainService,
      )
      storeDomainServiceContext.set(this, this.domainStore.storeDomainService)
      tagDomainServiceContext.set(this, this.domainStore.tagDomainService)
      typeDomainServiceContext.set(this, this.domainStore.typeDomainService)
      userDomainServiceContext.set(this, this.domainStore.userDomainService)
      preferenceDomainServiceContext.set(
        this,
        this.domainStore.preferenceDomainService,
      )
    }
  }

  const rootStore = new RootStore({})
  const undoManager = undoMiddleware(rootStore, undefined, { maxUndoLevels: 1 })

  registerRootStore(rootStore)

  return { rootStore, undoManager }
}
