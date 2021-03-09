import { ButtonProps as AntButtonProps, ButtonSize } from 'antd/lib/button'
import { ButtonHTMLType, ButtonShape, ButtonType } from 'antd/lib/button/button'
import { ReactNode } from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class ButtonProps implements AntButtonProps {

  @RjsfGridProp({
    title: 'Block',
    description: 'Option to fit button width to its parent width',
    row: 0,
    span: 6,
  })
  declare block?: boolean

  @RjsfGridProp({
    title: 'Danger',
    description: 'Set the danger status of button',
    row: 0,
    span: 6,
  })
  declare danger?: boolean

  @RjsfGridProp({
    title: 'Disabled',
    description: 'Disabled state of button',
    row: 0,
    span: 6,
  })
  declare disabled?: boolean

  @RjsfGridProp({
    title: 'Ghost',
    description: 'Make background transparent and invert text and border colors',
    row: 0,
    span: 6,
  })
  declare ghost?: boolean

  @RjsfGridProp({
    title: 'Href',
    description: 'Redirect url of link button',
    row: 1,
    span: 24,
 })
  declare href?: string

  @RjsfGridProp({
    type: 'string',
    description: 'Set the original html type of button',
    enum: ['submit', 'button', 'reset'],
    row: 2,
    span: 24,
  })
  declare htmlType?: ButtonHTMLType

  @RjsfGridProp({
    row: 3,
    span: 24,
    type: 'string',
    title: 'Icon',
    description: 'Set the icon component of button'
  })
  declare icon?: ReactNode

  @RjsfGridProp({
    title: 'Loading',
    description: 'Set the loading status of button',
    type: 'number',
    row: 4,
    span: 24,
  })
  declare loading?: boolean | { delay: number }

  @RjsfGridProp({
    title: 'Shape',
    description: 'Set the loading status of button',
    type: 'string',
    enum: ['circle', 'round'],
    row: 5,
    span: 24,
  })
  declare shape?: ButtonShape

  @RjsfGridProp({
    title: 'Size',
    description: 'Set the size of button',
    default: 'middle',
    type: 'string',
    enum: ['small', 'middle', 'large'],
    row: 6,
    span: 24,
  })
  declare size?: ButtonSize

  @RjsfGridProp({
    title: 'Target',
    description: 'Same as target attribute of a, works when href is specified',
    row: 7,
    span: 24,
  })
  declare target?: string

  @RjsfGridProp({
    title: 'Type',
    description: 'Can be set to primary ghost dashed link text default',
    type: 'string',
    enum: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
    row: 8,
    span: 24,
  })
  declare type?: ButtonType

  // @Optional()
  // declare onClick?: MouseEventHandler<HTMLElement>
}

// export class ButtonProps {
//   @Property()
//   @Enum(VertexType.React_Button)
//   // @Property(VertexType.React_Button)
//   declare type: string
//
//   @Schema(getJsonSchema(Props, { customKeys: true }))
//   @Title('')
//   declare props: object
// }
