import { Description, Optional, } from '@tsed/schema'
import { CardMetaProps as AntCardMetaProps } from 'antd/lib/card'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class CardMetaProps implements AntCardMetaProps {

  @RjsfGridProp({
    title: 'Avatar',
    description: 'Avatar or icon',
    type: 'string',
    row: 0,
    span: 24,
  })
  avatar?: React.ReactNode

  @Optional()
  @Description('The className of container')
  @RjsfGridProp({
    title: 'Class Name',
    description: 'The className of container',
    row: 1,
    span: 24,
  })
  className?: string

  @RjsfGridProp({
    title: 'Description',
    description: 'Description content',
    type: 'string',
    row: 2,
    span: 24,
  })
  description?: React.ReactNode

  @RjsfGridProp({
    title: 'Style',
    description: 'The style object of container',
    type: 'string',
    row: 3,
    span: 24,
  })
  style?: React.CSSProperties

  @RjsfGridProp({
     title: 'Title',
     description: 'Title content',
     type: 'string',
     row: 4,
     span: 24,
   })
  title?: React.ReactNode
}

// export class CardMetaProps {
//   @Property()
//   @Enum(VertexType.React_Card_Meta)
//   declare type: string
//
//   @Schema(getJsonSchema(Props))
//   @Title('')
//   declare props: object
// }
