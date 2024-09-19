'use client'

import type { IRootStore } from '@codelab/frontend/abstract/application'
import type { UndoManager } from 'mobx-keystone'
import { createContext, useContext } from 'react'

export const RootStoreContext = createContext<RootStoreProviderProps>(null!)

export interface RootStoreProviderProps {
  rootStore: IRootStore
  undoManager: UndoManager
}

export const useRootStore = () => useContext(RootStoreContext)

export const useUndoManager = () => {
  const { undoManager } = useRootStore()

  return undoManager
}
