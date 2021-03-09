import { SpaceProps as AntSpaceProps, SpaceSize } from 'antd/lib/space'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class SpaceProps implements AntSpaceProps {

  @RjsfGridProp({
    title: 'Align',
    description: 'Align items',
    type: 'string',
    enum: ['start', 'end', 'center', 'baseline'],
    row: 0,
    span: 24,
  })
  align?: 'start' | 'end' | 'center' | 'baseline'

  @RjsfGridProp({
    title: 'direction',
    description: 'The space direction',
    type: 'string',
    enum: ['horizontal', 'vertical'],
    default: 'horizontal',
    row: 1,
    span: 24,
  })
  direction?: 'horizontal' | 'vertical'

  @RjsfGridProp({
    title: 'Size',
    description: 'The space size',
    type: 'string',
    row: 2,
    span: 24,
  })
  size?: SpaceSize | [SpaceSize, SpaceSize]

  @RjsfGridProp({
    title: 'Split',
    description: 'Set split',
    type: 'string',
    row: 3,
    span: 24,
  })
  split?: React.ReactNode

  @RjsfGridProp({
    title: 'Wrap',
    description: 'Auto wrap line, when horizontal effective',
    row: 4,
    span: 24,
  })
  wrap?: boolean
}

// export class SpaceProps {
//   @Property()
//   @Enum(VertexType.React_Space)
//   declare type: string
//
//   @Schema(getJsonSchema(Props, { customKeys: true }))
//   @Title('')
//   declare props: object
// }
