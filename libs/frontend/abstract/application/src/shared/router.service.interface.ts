import type { ObjectLike } from '@codelab/shared-abstract-types'

import type { NextjsSearchParamsProps } from './nextjs.interface'

export interface IRouterService {
  searchParams: ObjectLike
  setSearchParams(props: NextjsSearchParamsProps): void
}
