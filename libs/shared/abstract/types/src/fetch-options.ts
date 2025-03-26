/**
 * Copied from `next/types/global.d.ts`
 */
export interface NextFetchRequestConfig {
  revalidate?: number | false
  tags?: Array<string>
}
/**
 * Add my own
 */
export type NextFetchOptions = NextFetchRequestConfig & {
  revalidateTags?: Array<string>
}
