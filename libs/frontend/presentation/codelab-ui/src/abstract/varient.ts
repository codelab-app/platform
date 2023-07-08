export type Variant =
  | 'danger'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'

export const variantColors: Record<Variant, string> = {
  danger: 'text-red-500',
  info: 'text-blue-500',
  primary: 'text-black',
  secondary: 'text-gray-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
}
