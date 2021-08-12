import { NextRouter } from 'next/router'
import * as R from 'ramda'

export enum PageType {
  Home = '/',
  Admin = '/admin',
  AppList = '/apps',
  PageList = '/apps/[appId]/pages',
  LambdaList = '/lambdas',
  PageDetail = '/apps/[appId]/pages/[pageId]',
  PageBuilder = '/apps/[appId]/pages/[pageId]/builder',
  AppDetail = '/apps/[appId]',
  ComponentDetail = '/components/[componentId]',
  ComponentList = '/components',
  ComponentDetailV2 = '/library/[libraryId]/component/[componentId]',
  Storybook = '/storybook',
  Atom = '/atoms',
  Type = '/types',
  InterfaceDetail = '/types/interfaces/[interfaceId]',
  AtomList = '/apps/[appId]/atoms',
  AtomTypeList = '/atom-types',
  LibraryList = '/apps/[appId]/library',
  LibraryDetail = '/apps/[appId]/library/[libraryId]',
  Prop = '/library/[libraryId]/props',
  Tag = '/tags',
  PropsInterface = '/apps/[appId]/props',
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
