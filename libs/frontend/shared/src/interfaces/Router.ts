import { NextRouter } from 'next/router'
import * as R from 'ramda'

export enum PageType {
  Home = '/',
  AppList = '/apps',
  PageList = '/pages',
  PageDetail = '/apps/[appId]/pages/[pageId]',
  AppDetail = '/apps/[appId]',
  ComponentDetail = '/components/[componentId]',
  ComponentList = '/components',
  ComponentDetailV2 = '/library/[libraryId]/component/[componentId]',
  LibraryList = '/library',
  Storybook = '/storybook',
  AtomList = '/atoms',
  AtomTypeList = '/atom-types',
  LibraryDetail = '/library/[libraryId]',
  Library = '/library',
  Prop = '/library/[libraryId]/props',
  Tag = '/tags',
}

export enum PaneType {
  Page = 'page',
  Component = 'component',
  Atom = 'atom',
  Library = 'library',
  PropTypeC = 'propTypeC',
}

type PropsWithRouter = {
  router: NextRouter
}

export type IsPage = (page: PageType) => (props: PropsWithRouter) => boolean

export const isPage: IsPage = R.curry(
  (page: PageType, props: PropsWithRouter) => props.router.pathname === page,
)
