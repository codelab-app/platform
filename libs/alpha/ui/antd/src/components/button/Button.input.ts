import { VertexType } from '@prisma/client'
import {
  Default,
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { ButtonProps as AntButtonProps, ButtonSize } from 'antd/lib/button'
import { ButtonHTMLType, ButtonShape, ButtonType } from 'antd/lib/button/button'
import { ReactNode } from 'react'

class Props implements AntButtonProps {
  @Optional()
  @Description('Option to fit button width to its parent width')
  declare block?: boolean

  @Optional()
  @Description('Set the danger status of button')
  declare danger?: boolean

  @Optional()
  @Description('Disabled state of button')
  declare disabled?: boolean

  @Optional()
  @Description(
    'Make background transparent and invert text and border colors\t',
  )
  declare ghost?: boolean

  @Optional()
  @Description('Redirect url of link button')
  declare href?: string

  @Optional()
  @Enum('submit', 'button', 'reset')
  @Description('Set the original html type of button')
  declare htmlType?: ButtonHTMLType

  @Optional()
  @Property('string')
  @Description('Set the icon component of button')
  declare icon?: ReactNode

  @Optional()
  @Property('number')
  @Description('Set the loading status of button')
  declare loading?: boolean | { delay: number }

  @Optional()
  @Enum('circle', 'round')
  @Description('Can be set button shape')
  declare shape?: ButtonShape

  @Optional()
  @Enum('small', 'middle', 'large')
  @Default('middle')
  @Description('Set the size of button')
  declare size?: ButtonSize

  @Optional()
  @Description('Same as target attribute of a, works when href is specified')
  declare target?: string

  @Optional()
  @Enum('default', 'primary', 'ghost', 'dashed', 'link', 'text')
  @Description('Can be set to primary ghost dashed link text default')
  declare type?: ButtonType

  // @Optional()
  // declare onClick?: MouseEventHandler<HTMLElement>
}

export class ButtonProps {
  @Property()
  @Enum(VertexType.React_Button)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
