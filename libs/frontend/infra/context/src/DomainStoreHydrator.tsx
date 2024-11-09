'use client'

import type { IDomainStoreDto } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { withProfiler } from '@sentry/react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useCustomCompareEffect } from 'react-use'
import { isDeepEqual } from 'remeda'

import { useHydrateStore } from './useStoreHydrator.hook'

type DomainStoreHydratorProps = IDomainStoreDto & {
  children: ReactNode
  fallback: ReactNode
}

/**
 * Server side renders all UI down the tree, but does not run `useEffect` until client.
 *
 * If we don't have fallback, it will assume all has been hydrated and render empty apps, but in fact we are still hydrating.
 *
 * Use a loading state to show fallback while hydrating
 *
 * Client components with `useEffect` will still render on server! This can be confusing
 */
export const DomainStoreHydrator = withProfiler(
  observer<DomainStoreHydratorProps>(({ children, fallback, ...data }) => {
    const hydrate = useHydrateStore()
    const [isHydrated, setIsHydrated] = useState(false)

    // atomsDto?.forEach((atom) => {
    //   typeDomainService.hydrateInterface(atom.api)
    //   atomDomainService.hydrate(atom)
    // })

    useCustomCompareEffect(
      () => {
        hydrate(data)
        setIsHydrated(true)
      },
      [hydrate, data],
      isDeepEqual,
    )

    // do not render children untill the store is hydrated with all the
    // specified entities. Othervise `assertIsDefined` may break the application
    return isHydrated ? <>{children}</> : <>{fallback}</>
  }),
  { name: 'DomainStoreHydrator' },
)
