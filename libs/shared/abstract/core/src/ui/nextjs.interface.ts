import { SnapshotOutOfModel } from 'mobx-keystone/src/snapshot/SnapshotOf'
import { AppProps } from 'next/app'
import { Overwrite } from 'utility-types'

/**
 * Used by `_app.tsx`
 */
export type IAppProps = Overwrite<
  AppProps<any>,
  {
    pageProps: IPageProps
  }
>

/**
 * The `props` used by each page component
 */
export interface IPageProps {
  storeSnapshot?: SnapshotOutOfModel<any>
  snapshot?: {
    // rootStore: SnapshotOutOfModel<any>
    appService: SnapshotOutOfModel<any>
    pageService: SnapshotOutOfModel<any>
    atomService: SnapshotOutOfModel<any>
    elementService: SnapshotOutOfModel<any>
    pageElementTree: SnapshotOutOfModel<any>
    builderService: SnapshotOutOfModel<any>
  }
}
