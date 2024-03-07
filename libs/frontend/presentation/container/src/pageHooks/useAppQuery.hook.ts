import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'

export const useAppQuery = () => {
  const { query } = useRouter()
  const appSlug = query.appSlug as string
  const primarySidebarKey = query.primarySidebarKey as string

  // if (!appSlug) {
  //   throw new Error('Missing appSlug')
  // }

  return {
    appName: getNameFromSlug(appSlug),
    appSlug,
    primarySidebarKey,
  }
}
