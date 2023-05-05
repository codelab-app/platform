import { useRouter } from 'next/router'

export const useActiveTab = () => {
  const { query } = useRouter()

  return query.activeTab as string | undefined
}
