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
import { LayoutProps as AntLayoutProps } from 'antd/lib/layout'
import { CSSProperties } from 'react'

class Props implements AntLayoutProps {
  @Optional()
  @Description('Container className')
  className?: string

  @Optional()
  @Description(
    "Whether contain Sider in children, don't have to assign it normally. Useful in ssr avoid style flickering\t",
  )
  hasSider?: boolean

  @Optional()
  @Property('string')
  @Description('To customize the styles')
  style?: CSSProperties
}

export class LayoutProps {
  @Property()
  @Enum(
    VertexType.React_Layout,
    VertexType.React_Layout_Header,
    VertexType.React_Layout_Footer,
    VertexType.React_Layout_Content,
  )
  declare type: string

  @Schema(getJsonSchema(Props))
  @Title('')
  declare props: object
}
