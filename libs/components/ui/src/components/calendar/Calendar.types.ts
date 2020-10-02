import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Calendar {
  export const propKeys = [
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
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
