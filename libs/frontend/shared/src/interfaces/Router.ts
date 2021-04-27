import { NextRouter } from 'next/router'
import * as R from 'ramda'

type Router = {
  url: string
}

const HOME: Router = {
  url: '/',
}
const APP_LIST: Router = {
  url: '/apps',
}
const APP_DETAIL: Router = {
  url: '/apps/[appId]',
}
const PAGE_LIST: Router = {
  url: '/apps/[appId]/pages',
}
const PAGE_DETAIL: Router = {
  url: '/apps/[appId]/pages/[pageId]',
}

const COMPONENT_DETAIL: Router = {
  url: '/components/[componentId]',
}

export const Page = {
  HOME,
  APP_LIST,
  APP_DETAIL,
  PAGE_LIST,
  PAGE_DETAIL,
  COMPONENT_DETAIL,
}

export enum PageType {
  Home = '/',
  AppList = '/apps',
  PageList = '/apps/[appId]/pages',
  PageDetail = '/apps/[appId]/pages/[pageId]',
  AppDetail = '/apps/[appId]',
  ComponentDetail = '/components/[componentId]',
}

type PropsWithRouter = {
  router: NextRouter
}

export type IsPage = (page: PageType) => (props: PropsWithRouter) => boolean

export const isPage: IsPage = R.curry(
  (page: PageType, props: PropsWithRouter) => props.router.pathname === page,
)
