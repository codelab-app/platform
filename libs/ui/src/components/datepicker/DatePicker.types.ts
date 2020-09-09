import { PropsFromKeys } from '@codelab/shared/interface'

export const commonPickerPropKeys = [
  'allowClear',
  'autoFocus',
  'className',
  'dateRender',
  'disabled',
  'disabledDate',
  'dropdownClassName',
  'getPopupContainer',
  'locale',
  'mode',
  'open',
  'picker',
  'placeholder',
  'popupStyle',
  'size',
  'bordered',
  'suffixIcon',
  'style',
  'onOpenChange',
  'onPanelChange',
  'inputReadOnly',
] as const

export const datePickerPropKeys = [
  'defaultValue',
  'defaultPickerValue',
  'disabledTime',
  'format',
  'renderExtraFooter',
  'showTime',
  'showTime.defaultValue',
  'showToday',
  'value',
  'onChange',
  'onOk',
  'onPanelChange',
  'showNow',
] as const

export const yearPickerPropKeys = [
  'defaultValue',
  'defaultPickerValue',
  'format',
  'renderExtraFooter',
  'value',
  'onChange',
] as const

export const quarterPickerPropKeys = [
  'defaultValue',
  'defaultPickerValue',
  'format',
  'renderExtraFooter',
  'value',
  'onChange',
] as const

export const monthPickerPropKeys = [
  'defaultValue',
  'defaultPickerValue',
  'format',
  'monthCellRender',
  'renderExtraFooter',
  'value',
  'onChange',
] as const

export const weekPickerPropKeys = [
  'defaultValue',
  'defaultPickerValue',
  'format',
  'renderExtraFooter',
  'value',
  'onChange',
] as const

export const rangePickerPropKeys = [
  'allowEmpty',
  'dateRender',
  'defaultValue',
  'defaultPickerValue',
  'disabled',
  'disabledTime',
  'format',
  'ranges',
  'renderExtraFooter',
  'separator',
  'showTime',
  'showTime.defaultValue',
  'value',
  'onCalendarChange',
  'onChange',
] as const

export type CommonPickerProps = PropsFromKeys<
  typeof commonPickerPropKeys[number]
>

export type DatePickerProps = PropsFromKeys<typeof datePickerPropKeys[number]>

export type YearPickerProps = PropsFromKeys<typeof yearPickerPropKeys[number]>

export type QuarterPickerProps = PropsFromKeys<
  typeof quarterPickerPropKeys[number]
>

export type MonthPickerProps = PropsFromKeys<typeof monthPickerPropKeys[number]>

export type WeekPickerProps = PropsFromKeys<typeof weekPickerPropKeys[number]>

export type RangePickerProps = PropsFromKeys<typeof rangePickerPropKeys[number]>
