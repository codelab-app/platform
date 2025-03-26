import { useSearchParamsProps } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Required for in app routing to work in the builder
 */
export const useInitializeSearchParams = () => {
  // eslint-disable-next-line ban/ban
  const searchParams = useSearchParams()
  const { routerService } = useApplicationStore()

  useEffect(() => {
    routerService.setSearchParams(searchParams)
  }, [searchParams])
}
