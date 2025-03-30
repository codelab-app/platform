import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'

export interface ITypeCreateRoute {
  searchParams: TreeViewClientProps & PaginationClientProps
}

export interface ITypeUpdateRoute {
  params: {
    typeId: string
  }
  searchParams: TreeViewClientProps & PaginationClientProps
}
