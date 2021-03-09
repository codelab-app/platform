import { CardGridProps as AntCardGridProps } from 'antd/lib/card'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class CardGridProps implements AntCardGridProps {

  @RjsfGridProp({
    title: 'Class Name',
    description: 'The className of container',
    row: 0,
    span: 24,
  })
  className?: string

  @RjsfGridProp({
    title: 'Hoverable',
    description: 'Lift up when hovering card grid',
    row: 1,
    span: 24,
  })
  hoverable?: boolean

  @RjsfGridProp({
    title: 'Style',
    description: 'The style object of container',
    type: 'string',
    row: 2,
    span: 24,
  })
  style?: React.CSSProperties
}

// export class CardGridProps {
//   @Property()
//   @Enum(VertexType.React_Card_Grid)
//   declare type: string
//
//   @Schema(getJsonSchema(Props))
//   @Title('')
//   declare props: object
// }
