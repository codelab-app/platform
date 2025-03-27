import type { TreeViewSearchParams } from '@codelab/frontend/abstract/types'

import type { IBuilderRoute } from '../builder'
import type { IRouteType } from '../shared'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAtomCreateRoute {
  // type?: IRouteType.Atom
}

export interface IAtomUpdateRoute {
  params: {
    atomId: string
  }
  searchParams: TreeViewSearchParams
  // type?: IRouteType.Atom
}
