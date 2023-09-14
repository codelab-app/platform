export enum Side {
  Top = 'n',
  Right = 'e',
  Bottom = 's',
  Left = 'w',
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

export const parseCssValue = (value: string): CssValue => {
  const unit = value.replace(/[0-9]/g, '')
  const number = parseFloat(value.replace(/[a-z]/g, ''))

  return {
    unit: unit as CssUnit,
    value: number,
  }
}
