import { createUniqueName } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import titleCase from 'voca/title_case'
import { useStore } from '../providers'

export const getNameFromSlug = (slug: string) => {
  // this is the only exception for now:
  // provider page has "_app" name which is sluggified to "app"
  // and we can't reverse it from "app" to "_app" following generic rules
  if (slug === 'app') {
    return '_app'
  }

  const str = slug.replace(/-/g, ' ')

  return titleCase(str)
}

export const useCurrentApp = () => {
  const { appService, userService } = useStore()
  const { query } = useRouter()
  const appSlug = query.appSlug as string
  const userName = query.userName as string
  const appName = appSlug && getNameFromSlug(appSlug)

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
