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
import * as React from 'react'
import { AtomType } from '@codelab/frontend'

class Props {
  @Optional()
  @Enum('xs', 'sm', 'md', 'lg', 'xl', 'xxl')
  @Description('Breakpoints of the responsive layout')
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

  @Optional()
  @Description('Container className')
  className?: string

  @Optional()
  @Description('To set the current status')
  collapsed?: boolean

  @Optional()
  @Default(80)
  @Property('number')
  @Description(
    'Width of the collapsed sidebar, by setting to 0 a special trigger will appear',
  )
  collapsedWidth?: number

  @Optional()
  @Description('Whether can be collapsed')
  collapsible?: boolean

  @Optional()
  @Description('To set the initial status')
  defaultCollapsed?: boolean

  @Optional()
  @Description(
    'Reverse direction of arrow, for a sider that expands from the right',
  )
  reverseArrow?: boolean

  @Optional()
  @Property('string')
  @Description('To customize the styles')
  style?: React.CSSProperties

  @Optional()
  @Default('dark')
  @Enum('light', 'dark')
  @Description('Color theme of the sidebar')
  theme?: 'light' | 'dark'

  @Optional()
  @Property('string')
  @Description(
    'Specify the customized trigger, set to null to hide the trigger',
  )
  trigger?: React.ReactNode

  @Optional()
  @Default(200)
  @Description('Width of the sidebar')
  width?: string

  @Optional()
  @Property('string')
  @Description(
    'To customize the styles of the special trigger that appears when collapsedWidth is 0',
  )
  zeroWidthTriggerStyle?: object
  //
  // onBreakpoint?: any
  //
  // onCollapse?: any
}
export class LayoutSiderProps {
  @Property()
  @Enum(AtomType.ReactLayoutSider)
  declare type: string

  @Schema(getJsonSchema(Props))
  @Title('')
  declare props: object
}
