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
