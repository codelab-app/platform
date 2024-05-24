'use client'

import type { UrlParams } from '@codelab/frontend/abstract/application'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { guestUser } from '@codelab/shared/data/test'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import { type PropsWithChildren, useState } from 'react'
import { StoreProvider } from './StoreProvider'

export const CuiStoreProvider = ({ children }: PropsWithChildren) => {
  const params = useParams<Required<UrlParams>>()
  const searchParams = useSearchParams()

  const [store] = useState(() => {
    const coreStore = createCoreStore(
      {
        param: {
          appSlug: params.appSlug,
          componentSlug: params.componentSlug,
          pageSlug: params.pageSlug,
          userSlug: params.userSlug,
        },
        query: {
          primarySidebarKey: searchParams.get('primarySidebarKey') ?? undefined,
        },
      },
      guestUser,
    )

    console.log(coreStore)

    registerRootStore(coreStore)

    return coreStore
  })

  return <StoreProvider value={store}>{children}</StoreProvider>
}
