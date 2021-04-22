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

export const Page = {
  HOME,
  APP_LIST,
  APP_DETAIL,
  PAGE_LIST,
  PAGE_DETAIL,
}

export enum PageType {
  Home = '/',
  AppList = '/apps',
  PageList = '/apps/[appId]/pages',
  PageDetail = '/apps/[appId]/pages/[pageId]',
  AppDetail = '/apps/[appId]',
}

type PropsWithRouter = {
  router: NextRouter
}

export type IsPage = (page: PageType) => (props: PropsWithRouter) => boolean

export const isPage: IsPage = R.curry(
  (page: PageType, props: PropsWithRouter) => props.router.pathname === page,
)
