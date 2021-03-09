import { DividerProps as AntDividerProps } from 'antd/lib/divider'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class DividerProps implements AntDividerProps {

  @RjsfGridProp({
    title: 'Class Name',
    description: 'The className of container',
    row: 0,
    span: 24,
  })
  className?: string

  @RjsfGridProp({
    title: 'Dashed',
    description: 'Whether line is dashed',
    row: 1,
    span: 24,
  })
  dashed?: boolean

  @RjsfGridProp({
    title: 'Orientation',
    description: 'The position of title inside divider',
    type: 'string',
    enum: ['left', 'right', 'center'],
    default: 'center',
    row: 2,
    span: 24,
  })
  orientation?: 'left' | 'right' | 'center'

  @RjsfGridProp({
    title: 'Plain',
    description: 'Divider text show as plain style',
    row: 3,
    span: 24,
  })
  plain?: boolean

  @RjsfGridProp({
    title: 'Style',
    description: 'The style object of container',
    type: 'string',
    row: 4,
    span: 24,
  })
  style?: React.CSSProperties

  @RjsfGridProp({
    title: 'Type',
    description: 'The direction type of divider',
    enum: ['horizontal', 'vertical'],
    type: 'string',
    default: 'horizontal',
    row: 5,
    span: 24,
  })
  type?: 'horizontal' | 'vertical'
}

// export class DividerProps {
//   @Property()
//   @Enum(VertexType.React_Divider)
//   declare type: string
//
//   @Schema(getJsonSchema(Props))
//   @Title('')
//   declare props: object
// }
