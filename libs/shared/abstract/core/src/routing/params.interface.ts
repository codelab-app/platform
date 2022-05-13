export const APP_ID = 'appId'
export const PAGE_ID = 'pageId'

export type APP_ID = typeof APP_ID
export type PAGE_ID = typeof PAGE_ID

export type UrlParams = {
  [APP_ID]: string
  [PAGE_ID]: string
}

export type WithUrlParams<T extends keyof UrlParams> = {
  [K in T]: string
}
