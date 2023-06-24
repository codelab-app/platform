import { createUniqueName, getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useStore } from '../providers'

export const useCurrentApp = () => {
  const { appService, userService } = useStore()
  const { query } = useRouter()
  const appSlug = query.appSlug as string
  const userName = query.userName as string
  const appName = getNameFromSlug(appSlug)

  const owner = userService.usersList.find(
    ({ username }) => username === userName,
  )

  if (!owner) {
    throw new Error(`User ${userName} not found`)
  }

  return useMemo(() => {
    const _compoundName = createUniqueName(appName, owner.auth0Id)
    const app = appService.appsList.find(({ name }) => name === appName)

    return { _compoundName, app, appName, appSlug, userName }
  }, [appName])
}
