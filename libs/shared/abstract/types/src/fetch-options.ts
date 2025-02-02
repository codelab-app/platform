/**
 * Copied from `next/types/global.d.ts`
 */
interface NextFetchRequestConfig {
  revalidate?: number | false
  tags?: Array<string>
}
export type NextFetchOptions = NextFetchRequestConfig & {
  revalidateTag?: string
}
