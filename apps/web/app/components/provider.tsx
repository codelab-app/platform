'use client'

import type { UrlParams } from '@codelab/frontend/abstract/application'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { guestUser } from '@codelab/shared/data/test'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import { type PropsWithChildren, useState } from 'react'

export const CuiStoreProvider = ({ children }: PropsWithChildren) => {
  const params = useParams<Partial<UrlParams>>()
  const searchParams = useSearchParams()

  const [store] = useState(() => {
    const coreStore = createCoreStore(
      {
        param: {
          appSlug: params?.appSlug,
          componentSlug: params?.componentSlug,
          pageSlug: params?.pageSlug,
          userSlug: params?.userSlug,
        },
        query: {
          primarySidebarKey:
            searchParams?.get('primarySidebarKey') ?? undefined,
        },
      },
      guestUser,
    )

    registerRootStore(coreStore)

    return coreStore
  })

  return <StoreProvider value={store}>{children}</StoreProvider>
}
