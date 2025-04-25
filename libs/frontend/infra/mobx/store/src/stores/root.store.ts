import type {
  IApplicationStore,
  IRootStore,
  IRootStoreInput,
} from '@codelab/frontend-abstract-application'
import type { IDomainStore } from '@codelab/frontend-abstract-domain'

import {
  Model,
  model,
  prop,
  registerRootStore,
  setGlobalConfig,
  UndoManager,
  undoMiddleware,
} from 'mobx-keystone'

import { createApplicationStore } from './application.store'
import { createDomainStore } from './domain.store'

export const createRootStore = ({
  user,
}: IRootStoreInput): {
  rootStore: IRootStore
  undoManager: UndoManager
} => {
  setGlobalConfig({
    showDuplicateModelNameWarnings: false,
  })

  const domainStore = createDomainStore(user)
  const applicationStore = createApplicationStore(domainStore)

  const ModelProps = {
    applicationStore: prop<IApplicationStore>(() => applicationStore),
    domainStore: prop<IDomainStore>(() => domainStore),
  }

  @model('@codelab/RootStore')
  class RootStore extends Model(ModelProps) implements IRootStore {}

  const rootStore = new RootStore({})

  const undoManager = undoMiddleware(rootStore, undefined, {
    maxUndoLevels: 1,
  })

  registerRootStore(rootStore)

  return { rootStore, undoManager }
}
