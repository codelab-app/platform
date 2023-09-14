import isNumber from 'lodash/isNumber'

export enum Side {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
  Center = 'center',
}

export enum CssUnit {
  PX = 'px',
  PERCENT = '%',
  REM = 'rem',
  EM = 'em',
  VW = 'vw',
  VH = 'vh',
  CH = 'ch',
  SVW = 'svw',
  SVH = 'svh',
}

export interface CssValue {
  unit?: CssUnit
  value?: number
}

export const combineCssValue = (value: CssValue) => {
  return `${value.value ?? 0}${value.unit ?? 'px'}`
}

export const parseCssValue = (value?: number | string): CssValue => {
  if (!value) {
    return {
      unit: CssUnit.PX,
      value: 0,
    }
  }

  if (isNumber(value)) {
    return {
      unit: CssUnit.PX,
      value: value as number,
    }
  }

  const unit = value.replace(/[0-9]/g, '')
  const number = parseFloat(value.replace(/[a-z]/g, ''))

  return {
    unit: unit as CssUnit,
    value: number,
  }
}

export const getCursorForSide = (side: Side) => {
  switch (side) {
    case Side.Top:
      return 'n-resize'
    case Side.Right:
      return 'e-resize'
    case Side.Bottom:
      return 's-resize'
  }

  return 'w-resize'
}

export const getCursorForSideReversed = (side: Side) => {
  switch (side) {
    case Side.Top:
      return 's-resize'
    case Side.Right:
      return 'w-resize'
    case Side.Bottom:
      return 'n-resize'
  }

  return 'e-resize'
}
