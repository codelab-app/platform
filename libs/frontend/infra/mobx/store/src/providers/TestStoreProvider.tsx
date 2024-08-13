'use client'

import type { ITestStore } from '@codelab/frontend/abstract/application'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

const TestStoreContext = createContext<ITestStore>(null!)

interface StoreProviderProps {
  value: ITestStore | null
}

export const TestStoreProvider: React.FC<
  PropsWithChildren<StoreProviderProps>
> = ({ children, value }) => {
  return value ? (
    <TestStoreContext.Provider value={value}>
      {children}
    </TestStoreContext.Provider>
  ) : (
    <>{children}</>
  )
}

export const useTestStore = () => useContext(TestStoreContext)
