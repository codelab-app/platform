import { getNameFromSlug } from '@codelab/shared/utils'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

export const useAppQuery = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const appSlug = params.appSlug as string
  const primarySidebarKey = searchParams.get('primarySidebarKey')

  return {
    appName: getNameFromSlug(appSlug),
    appSlug,
    primarySidebarKey,
  }
}
