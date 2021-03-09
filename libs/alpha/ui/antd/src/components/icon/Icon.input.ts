import { Description, Optional, } from '@tsed/schema'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class IconProps {

  @RjsfGridProp({
    title: 'Class Name',
    description: 'The className of Icon',
    row: 0,
    span: 24,
  })
  className?: string

  @RjsfGridProp({
    title: 'Rotate',
    description: 'Rotate by n degrees (not working in IE9)',
    row: 1,
    span: 24,
  })
  rotate?: number

  @RjsfGridProp({
    title: 'Spin',
    description: 'Rotate icon with animation',
    row: 2,
    span: 24,
  })
  spin?: boolean

  @RjsfGridProp({
    title: 'Style',
    description: 'The style properties of icon, like fontSize and color',
    type: 'string',
    row: 3,
    span: 24,
  })
  style?: React.CSSProperties

  @Optional()
  @Description('Only supports the two-tone icon. Specify the primary color')
  @RjsfGridProp({
    title: 'Two Tone Color',
    description: 'Only supports the two-tone icon. Specify the primary color',
    row: 4,
    span: 24,
  })
  twoToneColor?: string
}

// export class IconProps {
//   @Property()
//   @Enum(VertexType.React_Icon)
//   declare type: string
//
//   @Schema(getJsonSchema(Props))
//   @Title('')
//   declare props: object
// }
