import { useRouter } from 'next/router'

export const useCurrentTypeId = () => {
  const {
    query: { typeId },
  } = useRouter()

  return typeId as string
}
