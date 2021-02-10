import { Enum, Optional, Property, Title } from '@tsed/schema'
import { TextProps } from 'antd/lib/typography/Text'
import { TitleProps } from 'antd/lib/typography/Title'

@Title('Typography Title')
export class TypographyTitleProps implements TitleProps {
  @Optional()
  @Enum(1, 2, 3, 4, 5)
  declare level?: TitleProps['level']

  @Optional()
  @Enum('secondary', 'success', 'warning', 'danger')
  declare type?: TitleProps['type']
}

export class TypographyTextProps implements TextProps {
  @Property()
  declare mark: boolean
}
