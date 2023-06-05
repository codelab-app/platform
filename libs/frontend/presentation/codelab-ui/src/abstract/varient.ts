import type { TwStyle } from 'twin.macro'
import tw from 'twin.macro'

export type Varient =
  | 'danger'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'

export const varientColors: Record<Varient, TwStyle> = {
  danger: tw`text-red-500`,
  info: tw`text-blue-500`,
  primary: tw`text-black`,
  secondary: tw`text-gray-500`,
  success: tw`text-green-500`,
  warning: tw`text-yellow-500`,
}
