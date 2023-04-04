import type { NextRouter } from 'next/router'

export const extractTableQueries = (router: NextRouter) => {
  const page = router.query.page
    ? parseInt(router.query.page.toString())
    : undefined

  const pageSize = router.query.pageSize
    ? parseInt(router.query.pageSize.toString())
    : undefined

  const name = router.query.name ? router.query.name.toString() : undefined

  return {
    name,
    page,
    pageSize,
  }
}
