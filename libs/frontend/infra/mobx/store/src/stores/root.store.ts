import type {
  IApplicationStore,
  IRootStore,
  IRootStoreInput,
} from '@codelab/frontend/abstract/application'

import { IDomainStore } from '@codelab/frontend/abstract/domain'
import { withSpanFunc } from '@codelab/shared-infra-sentry'
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

export const createRootStore = withSpanFunc(
  {
    name: 'createRootStore',
    op: 'codelab.mobx',
  },
  ({ preference, routerProps, user }: IRootStoreInput) => {
    setGlobalConfig({
      showDuplicateModelNameWarnings: false,
    })

    const domainStore = createDomainStore(user, preference)
    const applicationStore = createApplicationStore(routerProps, domainStore)

    @model('@codelab/RootStore')
    class RootStore
      extends Model({
        applicationStore: prop<IApplicationStore>(() => applicationStore),
        domainStore: prop<IDomainStore>(() => domainStore),
      })
      implements IRootStore {}

    const rootStore = new RootStore({})

    const undoManager = undoMiddleware(rootStore, undefined, {
      maxUndoLevels: 1,
    })

    registerRootStore(rootStore)

    return { rootStore, undoManager }
  },
)
