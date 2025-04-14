'use client'

import type { IDomainStoreDto } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useDomainStoreHydrator } from './useDomainStoreHydrator.hook'

type DomainStoreHydratorProps = IDomainStoreDto & {
  children: ReactNode
}

/**
 * Server side renders all UI down the tree, but does not run `useEffect` until client.
 *
 * If we don't have fallback, it will assume all has been hydrated and render empty apps, but in fact we are still hydrating.
 *
 * Use a loading state to show fallback while hydrating
 *
 * Client components with `useEffect` will still render on server! This can be confusing
 *
 */
export const DomainStoreHydrator = observer<DomainStoreHydratorProps>(
  ({ children, ...data }) => {
    const hydrate = useDomainStoreHydrator()

    useEffect(() => {
      // logTimestampMs('DomainStoreHydrator start hydrate')
      hydrate(data)
      // logTimestampMs('DomainStoreHydrator end hydrate')
    }, [data, hydrate])

    return <>{children}</>
  },
)
