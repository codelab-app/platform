'use client'

import type { IAppModel } from '@codelab/frontend-abstract-domain'
import type { ReactNode } from 'react'

import { SUSPENSE_TIMEOUT } from '@codelab/frontend-shared-utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

export const AppConnector = observer(
  ({ children, id }: { id: string; children(app: IAppModel): ReactNode }) => {
    const { appDomainService } = useDomainStore()
    const app = appDomainService.apps.get(id)

    if (!app) {
      return null
    }

    // After delay, render with the actual app
    return <>{children(app)}</>
  },
)

export const AppMaybeConnector = observer(
  ({ children, id }: { id: string; children(app?: IAppModel): ReactNode }) => {
    const { appDomainService } = useDomainStore()
    const app = appDomainService.apps.get(id)
    // Add state to track if we're ready to render the actual app
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => setIsReady(true), SUSPENSE_TIMEOUT)

      return () => clearTimeout(timer)
    }, [])

    // Initially render with undefined, then with actual app after delay
    if (!isReady) {
      return <>{children(undefined)}</>
    }

    // After delay, render with the actual app
    return <>{children(app)}</>
  },
)

export const useApp = (id: string) => {
  const { appDomainService } = useDomainStore()

  return appDomainService.apps.get(id)
}

// export const AppConnectorV1 = observer(
//   ({ children, fallback = <Spinner />, id }: AppConnectorProps) => {
//     const { appDomainService } = useDomainStore()
//     // Track the app from the observable store
//     const app = appDomainService.apps.get(id)

//     // Enhanced reaction to handle both initial loading and updates
//     useEffect(() => {
//       console.log('AppConnector useEffect', app)

//       // Create a reaction that tracks changes to the app in the store
//       // const disposer = reaction(
//       //   // Data function tracking the app
//       //   () => appDomainService.apps.get(id),
//       //   // Effect runs when app changes
//       //   (currentApp) => {
//       //     console.log('currentApp', currentApp)
//       //   },
//       //   // Run immediately to handle initial state
//       //   { fireImmediately: true },
//       // )

//       const disposer = autorun(() => {
//         console.log('AppConnector autorun', appDomainService.apps.get(id))
//       })

//       // Clean up when unmounted
//       return disposer
//     }, [id])

//     // Force refresh of the app on every render to get latest from store
//     const currentApp = appDomainService.apps.get(id)

//     if (!currentApp) {
//       return <>{fallback}</>
//     }

//     return <>{children(currentApp)}</>
//   },
// )
