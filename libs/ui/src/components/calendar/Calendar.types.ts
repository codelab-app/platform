import { PropsFromKeys } from '@codelab/props'

export const calendarPropKeys = [
  'dateCellRender',
  'dateFullCellRender',
  'defaultValue',
  'disabledDate',
  'fullscreen',
  'locale',
  'mode',
  'monthCellRender',
  'monthFullCellRender',
  'validRange',
  'value',
  'onPanelChange',
  'onSelect',
  'onChange',
  'headerRender',
]

export type CalendarProps = PropsFromKeys<typeof calendarPropKeys[number]>
