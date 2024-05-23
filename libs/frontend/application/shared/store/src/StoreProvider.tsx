'use client'

import type {
  ICoreStore,
  UrlParams,
} from '@codelab/frontend/abstract/application'
import { useParams, useSearchParams } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

const StoreContext = createContext<ICoreStore>(null!)

interface StoreProviderProps {
  value: ICoreStore | null
}

export const StoreProvider: React.FC<PropsWithChildren<StoreProviderProps>> = ({
  children,
  value,
}) => {
  const params = useParams<Required<UrlParams>>()
  const searchParams = useSearchParams()

  return value ? (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  ) : (
    <>{children}</>
  )
}

export const useStore = () => useContext(StoreContext)
