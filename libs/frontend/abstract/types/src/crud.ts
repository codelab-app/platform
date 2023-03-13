export interface DeleteButtonProps<TEntity = unknown> {
  disabled?: boolean
  entity?: TEntity
  ids: Array<string>
}
export interface UpdateButtonProps {
  disabled?: boolean
  id: string
}
