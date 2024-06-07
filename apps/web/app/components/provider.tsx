'use client'

import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { guestUser } from '@codelab/shared/data/test'
import { registerRootStore } from 'mobx-keystone'
import React from 'react'
import { type PropsWithChildren, useState } from 'react'

export const CuiStoreProvider = ({ children }: PropsWithChildren) => {
  const { params, query } = useUrl()

  const [store] = useState(() => {
    const coreStore = createCoreStore(
      {
        params,
        query,
      },
      guestUser,
    )

    registerRootStore(coreStore)

    return coreStore
  })

  return <StoreProvider value={store}>{children}</StoreProvider>
}
