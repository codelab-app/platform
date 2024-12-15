import 'next/types/global'

export type NextFetchOptions = NextFetchRequestConfig & {
  revalidateTag?: string
}
