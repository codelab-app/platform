import { PropsFromKeys } from '@codelab/shared/interface'

export const divPropKeys = [
  'accessKey',
  'autoCapitalize',
  'className',
  'contentEditable',
  'dir',
  'draggable',
  'hidden',
  'id',
  'inputMode',
  'itemProp',
  'itemScope',
  'itemType',
  'itemID',
  'itemRef',
  'lang',
  'part',
  'slot',
  'spellCheck',
  'style',
  'tabIndex',
  'title',
  'translate',
] as const

export type DivProps = PropsFromKeys<typeof divPropKeys[number]>
