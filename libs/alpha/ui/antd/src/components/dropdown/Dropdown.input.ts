import { VertexType } from '@prisma/client'
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
import { DropDownProps as AntDropdownProps } from 'antd/lib/dropdown'
import * as React from 'react'
import { MenuProps } from '../menu/Menu.input'

declare const Placements: [
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
]

declare type Placement = typeof Placements[number]

export class DropDownProps implements AntDropdownProps {
  @Optional()
  @Default(false)
  @Description('Whether the dropdown arrow should be visible')
  declare arrow?: boolean

  @Optional()
  @Description('Whether the dropdown menu is disabled')
  declare disabled?: boolean

  // declare getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  @Optional()
  @Schema(getJsonSchema(MenuProps, { customKeys: true }))
  @Description('The dropdown menu')
  declare overlay: any

  @Optional()
  @Description('The class name of the dropdown root element')
  declare overlayClassName?: string

  @Optional()
  @Property('string')
  @Description('The style of the dropdown root element')
  declare overlayStyle?: React.CSSProperties

  @Optional()
  @Default('bottomLeft')
  @Enum(
    'topLeft',
    'topCenter',
    'topRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight',
  )
  @Description('Placement of popup menu')
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
  declare trigger?: Array<'click' | 'hover' | 'contextMenu'>

  // declare onVisibleChange?: (visible: boolean) => void;

  @Optional()
  @Description('Whether the dropdown menu is currently visible')
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
