import { PropsFromKeys } from '@codelab/shared/interface/props'

export const menuPropKeys = [
  'defaultOpenKeys',
  'defaultSelectedKeys',
  'forceSubMenuRender',
  'inlineCollapsed',
  'inlineIndent',
  'mode',
  'multiple',
  'openKeys',
  'selectable',
  'selectedKeys',
  'style',
  'subMenuCloseDelay',
  'subMenuOpenDelay',
  'theme',
  'onClick',
  'onDeselect',
  'triggerSubMenuAction',
  'onOpenChange',
  'onSelect',
  'overflowedIndicator',
]

export const itemPropKeys = ['disabled', 'key', 'title', 'icon', 'danger']

export const submenuPropKeys = [
  'popupClassName',
  'children',
  'disabled',
  'key',
  'title',
  'icon',
  'onTitleClick',
]

export const itemGroupPropKeys = ['children', 'title']

export type MenuProps = PropsFromKeys<typeof menuPropKeys[number]>

export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>

export type SubmenuProps = PropsFromKeys<typeof submenuPropKeys[number]>

export type ItemGroupProps = PropsFromKeys<typeof itemGroupPropKeys[number]>
