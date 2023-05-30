import { createUniqueName } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useStore } from '../providers'
import { useCurrentApp } from './useCurrentApp.hook'

export const useCurrentPage = () => {
  const { app } = useCurrentApp()
  const { pageService, userService } = useStore()
  const { query } = useRouter()
  const pageName = query.pageName as string
  const userName = query.userName as string

  const user = userService.usersList.find(
    ({ username }) => username === userName,
  )

  if (!user) {
    throw new Error(`User ${userName} not found`)
  }

  return useMemo(() => {
    const _compoundName = createUniqueName(pageName, user.auth0Id)

    const page =
      app &&
      pageService.pagesByApp(app.id).find(({ name }) => name === pageName)

    return { _compoundName, page, pageName }
  }, [pageName, userName])
}
