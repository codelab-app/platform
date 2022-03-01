import { useRouter } from 'next/router'

export const useCurrentAppId = () => {
  const { query } = useRouter()

  return query.appId as string
}
