'use client'

import { createDomainStore } from '@codelab/frontend/infra/mobx'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { registerRootStore } from 'mobx-keystone'
import React from 'react'
import { type PropsWithChildren, useState } from 'react'

export const CuiStoreProvider = ({ children }: PropsWithChildren) => {
  const { params, query } = useUrl()

  const [store] = useState(() => {
    const domainStore = createDomainStore()

    registerRootStore(domainStore)

    return domainStore
  })

  return <StoreProvider value={store}>{children}</StoreProvider>
}
