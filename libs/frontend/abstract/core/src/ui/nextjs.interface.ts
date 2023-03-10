import type { Auth0SessionUser } from '@codelab/shared/abstract/core'
import type { AppProps } from 'next/app'
import type { Overwrite } from 'utility-types'

/**
 * Used by `_app.tsx`
 */
export type IAppProps<T = object> = Overwrite<
  AppProps<T>,
  {
    pageProps: T
  }
>

/**
 * The `props` used by each page component
 */
export interface IPageProps {
  // storeSnapshot?: SnapshotOutOfModel<any>
  user?: Auth0SessionUser
  // data returned by user after running code inside getServerSideProps
  // getServerSidePropsData?: IPropData
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
