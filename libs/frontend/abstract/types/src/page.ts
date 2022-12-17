import type { NextRouter } from 'next/router'
import * as R from 'ramda'
import type { PageType } from './pageType'

interface PropsWithRouter {
  router: NextRouter
}

export type IsPage = (page: PageType) => (props: PropsWithRouter) => boolean

export const isPage: IsPage = R.curry(
  (page: PageType, props: PropsWithRouter) => props.router.pathname === page,
)
