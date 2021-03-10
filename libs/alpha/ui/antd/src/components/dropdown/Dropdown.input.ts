import { VertexType } from '@prisma/client'
import { Description, Enum, getJsonSchema, Optional, Property, Schema, Title, } from '@tsed/schema'
import { DropDownProps as AntDropdownProps } from 'antd/lib/dropdown'
import * as React from 'react'
import { MenuProps } from '../menu/Menu.input'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

declare const Placements: [
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
]

declare type Placement = typeof Placements[number]

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class DropDownProps implements AntDropdownProps {

  @RjsfGridProp({
    title: 'Arrow',
    description: 'Whether the dropdown arrow should be visible',
    row: 0,
    span: 24,
  })
  declare arrow?: boolean

  @RjsfGridProp({
    title: 'Disabled',
    description: 'Whether the dropdown menu is disabled',
    row: 1,
    span: 24,
  })
  declare disabled?: boolean

  // declare getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  // @Optional()
  // @Schema(getJsonSchema(MenuProps, { customKeys: true }))
  // @Description('The dropdown menu')
  @RjsfGridProp({
    title: 'Overlay',
    description: 'The dropdown menu',
    clazz: MenuProps,
    row: 2,
    span: 24,
  })
  declare overlay: any

  @RjsfGridProp({
    title: 'Overlay Class Name',
    description: 'The class name of the dropdown root element',
    row: 3,
    span: 24,
  })
  declare overlayClassName?: string

  @RjsfGridProp({
    title: 'Overlay Style',
    description: 'The style of the dropdown root element',
    type: 'string',
    row: 4,
    span: 24,
  })
  declare overlayStyle?: React.CSSProperties

  @RjsfGridProp({
    title: 'Placement',
    description: 'Placement of popup menu',
    type: 'string',
    enum: [
      'topLeft',
      'topCenter',
      'topRight',
      'bottomLeft',
      'bottomCenter',
      'bottomRight'
    ],
    default: 'bottomLeft',
    row: 5,
    span: 24,
  })
  declare placement?: Placement

  @Optional()
  @Schema({
    type: 'array',
    title: 'Trigger',
    uniqueItems: true,
    maxItems: 3,
    default: ['hover'],
    items: {
      type: 'string',
      enum: ['click', 'hover', 'contextMenu'],
    },
  })
  @Description(
    "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
  )
  @RjsfGridProp({
    row: 6,
    span: 24,
  })
  declare trigger?: Array<'click' | 'hover' | 'contextMenu'>

  // declare onVisibleChange?: (visible: boolean) => void;

  @RjsfGridProp({
    title: 'Visible',
    description: 'Whether the dropdown menu is currently visible',
    row: 6,
    span: 24,
  })
  declare visible?: boolean
}

export class DropdownSelectedProps {
  @Property()
  @Enum(VertexType.React_Dropdown)
  declare type: string

  @Schema(getJsonSchema(DropDownProps, { customKeys: true }))
  @Title('')
  declare props: object
}
