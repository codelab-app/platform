import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import type { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
// eslint-disable-next-line no-restricted-imports
import type { DefaultOptionType } from 'antd/lib/select'
import type React from 'react'
import type { ForwardRefExoticComponent } from 'react'

export interface SelectOption extends DefaultOptionType {
  label: string
  value: string
}

export interface RenderTypeSelectOption extends SelectOption {
  __typename: IElementRenderTypeKind
  icon: ForwardRefExoticComponent<AntdIconProps>
}
