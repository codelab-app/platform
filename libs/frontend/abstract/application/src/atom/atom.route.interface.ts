import type { SearchParamsClientProps } from '@codelab/frontend/abstract/types'

export interface IAtomCreateRoute {
  // type?: IRouteType.Atom
  searchParams: SearchParamsClientProps
}

export interface IAtomUpdateRoute {
  params: {
    atomId: string
  }
  searchParams: SearchParamsClientProps
  // type?: IRouteType.Atom
}
