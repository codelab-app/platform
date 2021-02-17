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
import { SpaceProps as AntSpaceProps, SpaceSize } from 'antd/lib/space'
import * as React from 'react'

class Props implements AntSpaceProps {
  @Optional()
  @Enum('start', 'end', 'center', 'baseline')
  @Description('Align items')
  align?: 'start' | 'end' | 'center' | 'baseline'

  @Optional()
  @Default('horizontal')
  @Enum('horizontal', 'vertical')
  @Description('The space direction')
  direction?: 'horizontal' | 'vertical'

  @Optional()
  @Property('string')
  @Description('The space size')
  size?: SpaceSize | [SpaceSize, SpaceSize]

  @Optional()
  @Property('string')
  @Description('Set split')
  split?: React.ReactNode

  @Optional()
  @Description('Auto wrap line, when horizontal effective')
  wrap?: boolean
}

export class SpaceProps {
  @Property()
  @Enum(VertexType.React_Space)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
