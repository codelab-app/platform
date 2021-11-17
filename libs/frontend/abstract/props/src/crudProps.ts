export interface DeleteButtonProps<TEntity = any> {
  ids: Array<string>
  /* @deprecated use entity */
  metadata?: any
  entity?: TEntity
  disabled?: boolean
}
export interface UpdateButtonProps {
  id: string
  disabled?: boolean
}
