import type { IPage } from '@codelab/shared/abstract/core'

/**
 * IOwnerSchema is required for store api
 */
export type ICreatePageData = Pick<
  IPage,
  'app' | 'id' | 'kind' | 'name' | 'url' | 'getServerSideProps'
>

export type IUpdatePageData = Pick<
  IPage,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'getServerSideProps' | 'url'
>
