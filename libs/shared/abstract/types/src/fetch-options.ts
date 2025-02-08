/**
 * Copied from `next/types/global.d.ts`
 */
export interface NextFetchRequestConfig {
  revalidate?: number | false
  tags?: Array<string>
}
export type NextFetchOptions = NextFetchRequestConfig & {
  revalidateTag?: string
}
