import { Slider } from 'antd'

import { CssUnit } from '../utils'

interface ValueSliderProps {
  unit?: CssUnit
  value?: number
  onChange?(value: string): void
}

const getMinMax = (unit?: CssUnit) => {
  switch (unit) {
    case CssUnit.CH:
      return { max: 10, min: 0 }
    case CssUnit.EM:
      return { max: 10, min: 0 }
    case CssUnit.PERCENT:
      return { max: 100, min: 0 }
    case CssUnit.PX:
      return { max: 300, min: 0 }
    case CssUnit.REM:
      return { max: 10, min: 0 }
    case CssUnit.SVH:
      return { max: 100, min: 0 }
    case CssUnit.SVW:
      return { max: 100, min: 0 }
    case CssUnit.VH:
      return { max: 100, min: 0 }
    case CssUnit.VW:
      return { max: 100, min: 0 }
    default:
      return { max: 100, min: 0 }
  }
}

export const ValueSlider = ({ onChange, unit, value }: ValueSliderProps) => {
  const { max, min } = getMinMax(unit)

  return (
    <Slider
      max={max}
      min={min}
      onChange={(val) =>
        onChange?.(`${val}${unit === CssUnit.Auto ? CssUnit.PX : unit}`)
      }
      value={value}
    />
  )
}
