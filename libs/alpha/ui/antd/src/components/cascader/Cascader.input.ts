import { VertexType } from '@prisma/client'
import { Enum, Property, Schema, Title, getJsonSchema } from '@tsed/schema'
import {
  CascaderProps as AntCascaderProps,
  CascaderOptionType,
} from 'antd/lib/cascader'

class Props implements AntCascaderProps {
  allowClear?: boolean

  declare options: Array<CascaderOptionType>
}

export class CascaderProps {
  @Property()
  @Enum(VertexType.React_Cascader)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
