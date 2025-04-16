import type { SearchParamsClientProps } from '@codelab/frontend-abstract-types'

export interface ITypeCreateRoute {
  searchParams: SearchParamsClientProps
}

export interface ITypeUpdateRoute {
  params: {
    typeId: string
  }
  searchParams: SearchParamsClientProps
}
