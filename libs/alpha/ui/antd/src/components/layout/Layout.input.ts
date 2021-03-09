import { LayoutProps as AntLayoutProps } from 'antd/lib/layout'
import { CSSProperties } from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class LayoutProps implements AntLayoutProps {

  @RjsfGridProp({
    title: 'Class Name',
    description: 'The className of container',
    row: 0,
    span: 24,
  })
  className?: string

  @RjsfGridProp({
    title: 'Has Sider',
    description: 'Whether contain Sider in children, don\'t have to assign it normally. Useful in ssr avoid style flickering',
    row: 1,
    span: 24,
  })
  hasSider?: boolean

  @RjsfGridProp({
    title: 'Style',
    description: 'To customize the styles',
    type: 'string',
    row: 2,
    span: 24,
  })
  style?: CSSProperties
}

// export class LayoutProps {
//   @Property()
//   @Enum(
//     VertexType.React_Layout,
//     VertexType.React_Layout_Header,
//     VertexType.React_Layout_Footer,
//     VertexType.React_Layout_Content,
//   )
//   declare type: string
//
//   @Schema(getJsonSchema(Props))
//   @Title('')
//   declare props: object
// }
