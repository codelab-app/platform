export interface DeleteButtonProps<TEntity = unknown> {
  ids: Array<string>
  entity?: TEntity
  disabled?: boolean
}
export interface UpdateButtonProps {
  id: string
  disabled?: boolean
}
