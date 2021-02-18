import { VertexType } from '@prisma/client'
import {
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { ButtonProps as AntButtonProps } from 'antd/lib/button'

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
}

export class TestProps {
  @Property()
  @Enum(VertexType.React_Button)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}

export class MoreTestPropsHidden {}

export class MoreTestProps {}
