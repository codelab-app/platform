import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'

export const useAppQuery = () => {
  const { query } = useRouter()
  const appSlug = query.appSlug as string

  if (!appSlug) {
    throw new Error('Missing appSlug')
  }

  return {
    appName: getNameFromSlug(appSlug),
    appSlug,
  }
}
