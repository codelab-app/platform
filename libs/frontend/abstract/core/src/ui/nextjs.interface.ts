import { Auth0SessionUser } from '@codelab/shared/abstract/core'
import { AppProps } from 'next/app'
import { Overwrite } from 'utility-types'

/**
 * Used by `_app.tsx`
 */
export type IAppProps<T = unknown> = Overwrite<
  AppProps<T>,
  {
    pageProps: IPageProps
  }
>

/**
 * The `props` used by each page component
 */
export interface IPageProps {
  // storeSnapshot?: SnapshotOutOfModel<any>
  user?: Auth0SessionUser
  // snapshot?: {
  // rootStore: SnapshotOutOfModel<any>
  // appService: SnapshotOutOfModel<any>
  // pageService: SnapshotOutOfModel<any>
  // atomService: SnapshotOutOfModel<any>
  // elementService: SnapshotOutOfModel<any>
  // pageElementTree: SnapshotOutOfModel<any>
  // builderService: SnapshotOutOfModel<any>
  // }
}
