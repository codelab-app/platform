import { Slider as AntSlider } from 'antd'
import { SliderSingleProps as AntSliderProps } from 'antd/lib/slider'
import React from 'react'

export type SliderProps = AntSliderProps

export namespace Slider {
  export const Default: React.FC<SliderProps> = (props) => {
    return <AntSlider {...props} />
  }
}
