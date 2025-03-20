'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const AppConnector = observer(
  ({ children, id }: { id: string; children(app: IAppModel): ReactNode }) => {
    const { appDomainService } = useDomainStore()
    const app = appDomainService.apps.get(id)

    if (!app) {
      return <Spinner />
    }

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
