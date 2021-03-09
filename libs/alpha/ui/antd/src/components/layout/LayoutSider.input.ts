import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class LayoutSiderProps {

  @RjsfGridProp({
    title: 'Breakpoint',
    description: 'Breakpoints of the responsive layout',
    type: 'string',
    enum: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    row: 0,
    span: 24,
  })
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

  @RjsfGridProp({
    title: 'Class Name',
    description: 'The className of container',
    row: 1,
    span: 24,
  })
  className?: string

  @RjsfGridProp({
    title: 'Collapsed',
    description: 'To set the current status',
    row: 2,
    span: 24,
  })
  collapsed?: boolean

  @RjsfGridProp({
    title: 'Collapsed Width',
    description: 'Width of the collapsed sidebar, by setting to 0 a special trigger will appear',
    default: 80,
    row: 3,
    span: 24,
  })
  collapsedWidth?: number

  @RjsfGridProp({
    title: 'Collapsible',
    description: 'Whether can be collapsed',
    row: 4,
    span: 24,
  })
  collapsible?: boolean

  @RjsfGridProp({
    title: 'Default Collapsed',
    description: 'To set the initial status',
    row: 5,
    span: 24,
  })
  defaultCollapsed?: boolean

  @RjsfGridProp({
    title: 'Reverse Arrow',
    description: 'Reverse direction of arrow, for a sider that expands from the right',
    row: 6,
    span: 24,
  })
  reverseArrow?: boolean

  @RjsfGridProp({
    title: 'Style',
    description: 'To customize the styles',
    type: 'string',
    row: 7,
    span: 24,
  })
  style?: React.CSSProperties

  @RjsfGridProp({
    title: 'Theme',
    description: 'Color theme of the sidebar',
    enum: ['light', 'dark'],
    default: 'dark',
    type: 'string',
    row: 8,
    span: 24,
  })
  theme?: 'light' | 'dark'

  @RjsfGridProp({
    title: 'Trigger',
    description: 'Specify the customized trigger, set to null to hide the trigger',
    type: 'string',
    row: 9,
    span: 24,
  })
  trigger?: React.ReactNode

  @RjsfGridProp({
    title: 'Width',
    description: 'Width of the sidebar',
    default: '200',
    row: 10,
    span: 24,
  })
  width?: string

  @RjsfGridProp({
    title: 'Zero Width Trigger Style',
    description: 'To customize the styles of the special trigger that appears when collapsedWidth is 0',
    type: 'string',
    row: 11,
    span: 24,
  })
  zeroWidthTriggerStyle?: object
  //
  // onBreakpoint?: any
  //
  // onCollapse?: any
}
// export class LayoutSiderProps {
//   @Property()
//   @Enum(VertexType.React_Layout_Sider)
//   declare type: string
//
//   @Schema(getJsonSchema(Props))
//   @Title('')
//   declare props: object
// }
