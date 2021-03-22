import { NextRouter } from 'next/router'
import * as R from 'ramda'

type Router = {
  url: string
}

export namespace Page {
  export const HOME: Router = {
    url: '/',
  }
  export const APP_LIST: Router = {
    url: '/apps',
  }
  export const APP_DETAIL: Router = {
    url: '/apps/[appId]',
  }
  export const PAGE_LIST: Router = {
    url: '/apps/[appId]/pages',
  }
  export const PAGE_DETAIL: Router = {
    url: '/apps/[appId]/pages/[pageId]',
  }
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
