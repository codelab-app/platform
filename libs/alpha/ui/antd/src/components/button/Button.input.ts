import { Enum, Optional } from '@tsed/schema'
import { ButtonProps as AntButtonProps, ButtonSize } from 'antd/lib/button'
import { ButtonHTMLType, ButtonShape, ButtonType } from 'antd/lib/button/button'
import { MouseEventHandler, ReactNode } from 'react'

export class ButtonProps implements AntButtonProps {
  @Optional()
  declare block?: boolean

  @Optional()
  declare danger?: boolean

  @Optional()
  declare disabled?: boolean

  @Optional()
  declare ghost?: boolean

  @Optional()
  declare href?: string

  @Optional()
  declare htmlType?: ButtonHTMLType

  @Optional()
  declare icon?: ReactNode

  @Optional()
  declare loading?: boolean | { delay: number }

  @Optional()
  @Enum('circle', 'round')
  declare shape?: ButtonShape

  @Optional()
  @Enum('small', 'middle', 'large')
  declare size?: ButtonSize

  @Optional()
  declare target?: string

  @Optional()
  @Enum('default', 'primary', 'ghost', 'dashed', 'link', 'text')
  declare type?: ButtonType

  @Optional()
  declare onClick?: MouseEventHandler<HTMLElement>
}
