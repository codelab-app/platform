/**
 * These come straight from the server, not validated yet.
 */

export type SearchParamsServerProps = TreeViewServerProps &
  PaginationServerProps
export interface TreeViewServerProps {
  expandedKeys?: string | Array<string> | undefined
  selectedKey?: string | undefined
}

export interface PaginationServerProps {
  filter?: string | Array<string>
  page?: string | undefined
  pageSize?: string | undefined
  search?: string | undefined
}
