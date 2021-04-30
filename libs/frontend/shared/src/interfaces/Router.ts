import { NextRouter } from 'next/router'
import * as R from 'ramda'

export enum PageType {
  Home = '/',
  AppList = '/apps',
  PageList = '/apps/[appId]/pages',
  PageDetail = '/apps/[appId]/pages/[pageId]',
  AppDetail = '/apps/[appId]',
  ComponentDetail = '/components/[componentId]',
  ComponentDetailV2 = '/library/[libraryId]/component/[componentId]',
  LibraryList = '/library',
  AtomList = '/library/[libraryId]/atom',
  LibraryDetail = '/library/[libraryId]',
}

export enum PaneType {
  Page = 'page',
  Component = 'component',
  Atom = 'atom',
  Library = 'library',
}

type PropsWithRouter = {
  router: NextRouter
}

export type IsPage = (page: PageType) => (props: PropsWithRouter) => boolean

export const isPage: IsPage = R.curry(
  (page: PageType, props: PropsWithRouter) => props.router.pathname === page,
)
