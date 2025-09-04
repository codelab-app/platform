import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import type { IElementRenderTypeKind } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'
// eslint-disable-next-line no-restricted-imports
import type { DefaultOptionType } from 'antd/lib/select'
import type { ForwardRefExoticComponent } from 'react'

export interface SelectOption extends DefaultOptionType {
  label: string
  value: string
}

export interface RenderTypeSelectOption extends SelectOption {
  __typename: IElementRenderTypeKind
  icon: ForwardRefExoticComponent<AntdIconProps>
}

export type SchemaBuilder<BuilderInput, Data> = (
  data: BuilderInput,
) => JSONSchemaType<Data>
