import type { UrlPathParams } from './url-path'

export type PageContextParams = Pick<
  Required<UrlPathParams>,
  'appId' | 'pageId'
>

export type ComponentContextParams = Pick<
  Required<UrlPathParams>,
  'componentId'
>
