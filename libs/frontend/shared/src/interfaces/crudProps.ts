export interface UpdateButtonProps {
  id: string | undefined
  disabled: boolean
}

export interface DeleteButtonProps {
  ids: Array<string>
  metadata?: any
  disabled: boolean
}
