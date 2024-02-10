import type { IPage } from '@codelab/shared/abstract/core'

export type IUpdatePageData = Pick<
  IPage,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'url'
>
