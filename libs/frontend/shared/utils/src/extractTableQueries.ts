import type { NextRouter } from 'next/router'

export const extractTableQueries = (router: NextRouter) => {
  const page = router.query.page
    ? parseInt(router.query.page.toString())
    : undefined

  const pageSize = router.query.pageSize
    ? parseInt(router.query.pageSize.toString())
    : undefined

  const searchName = router.query.searchName
    ? router.query.searchName.toString()
    : undefined

  return {
    page,
    pageSize,
    searchName,
  }
}
