// eslint-disable-next-line no-restricted-imports
import type { DefaultOptionType } from 'antd/lib/select'

export interface SelectOption extends DefaultOptionType {
  label: string
  value: string
}
