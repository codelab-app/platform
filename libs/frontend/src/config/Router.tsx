import { NextRouter } from 'next/router'
import * as R from 'ramda'

type Router = {
  url: string
}

export const HOME_PAGE: Router = {
  url: '/',
}

export const APP_LIST_PAGE: Router = {
  url: '/apps',
}

export const PAGE_LIST_PAGE: Router = {
  url: '/apps/[appId]/pages',
}

export const APP_DETAIL_PAGE: Router = {
  url: '/apps/[appId]',
}

export enum PageType {
  Home = '/',
  AppList = '/apps',
  PageList = '/apps/[appId]/pages',
  AppDetail = '/apps/[appId]',
}

type PropsWithRouter = {
  router: NextRouter
}

export type IsPage = (page: PageType) => (props: PropsWithRouter) => boolean

export const isPage: IsPage = R.curry(
  (page: PageType, props: PropsWithRouter) => props.router.pathname === page,
)

// export const useRouter = (page?: PageType) => {
//   const route = useNextRouter()

//   return {
//     ...route,
//     isPage: (currentPage: PageType) => route.asPath === currentPage,
//   }
// }
