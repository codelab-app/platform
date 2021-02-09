import { Optional, Property } from '@tsed/schema'
import { Layout } from 'react-grid-layout'

export class RGLLayoutProps implements Layout {
  @Property()
  declare i: string

  @Property()
  declare x: number

  @Property()
  declare y: number

  @Property()
  declare w: number

  @Property()
  declare h: number

  @Optional()
  declare minW?: number

  @Optional()
  declare maxW?: number

  @Optional()
  declare minH?: number

  @Optional()
  declare maxH?: number

  @Optional()
  declare emoved?: boolean

  @Optional()
  declare static?: boolean

  @Optional()
  declare isDraggable?: boolean

  @Optional()
  declare isResizable?: boolean

  @Optional()
  declare resizeHandles?: Array<
    's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'
  >

  @Optional()
  declare isBounded?: boolean
}
