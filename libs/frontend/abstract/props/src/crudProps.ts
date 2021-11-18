export interface DeleteButtonProps<TEntity = any> {
  ids: Array<string>
  entity?: TEntity
  disabled?: boolean
}
export interface UpdateButtonProps {
  id: string
  disabled?: boolean
}
