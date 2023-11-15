import CloseOutlined from '@ant-design/icons/CloseOutlined'
import DashOutlined from '@ant-design/icons/DashOutlined'
import MinusOutlined from '@ant-design/icons/MinusOutlined'
import SmallDashOutlined from '@ant-design/icons/SmallDashOutlined'
import { Col } from 'antd'
import React from 'react'
import { LabeledSelect, SegmentedSelect, ValuePicker } from '../components'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'
import { CssUnit } from '../utils'

const blendOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Multiply', value: 'multiply' },
  { label: 'Screen', value: 'screen' },
  { label: 'Overlay', value: 'overlay' },
  { label: 'Darken', value: 'darken' },
  { label: 'Lighten', value: 'lighten' },
  { label: 'Color Dodge', value: 'color-dodge' },
  { label: 'Color Burn', value: 'color-burn' },
  { label: 'Hard Light', value: 'hard-light' },
  { label: 'Soft Light', value: 'soft-light' },
  { label: 'Difference', value: 'difference' },
  { label: 'Exclusion', value: 'exclusion' },
  { label: 'Hue', value: 'hue' },
  { label: 'Saturation', value: 'saturation' },
  { label: 'Color', value: 'color' },
  { label: 'Luminosity', value: 'luminosity' },
]

const outlineOptions = [
  {
    icon: <CloseOutlined />,
    value: 'none',
  },
  {
    icon: <MinusOutlined />,
    value: 'solid',
  },
  {
    icon: <DashOutlined />,
    value: 'dashed',
  },
  {
    icon: <SmallDashOutlined />,
    value: 'dotted',
  },
]

// TODO: add more options
export const EffectsEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  return (
    <Col className="space-y-2">
      <LabeledSelect
        canReset={canReset(CssProperty.MixBlendMode)}
        label="Blending"
        onChange={(val) => setStyle(CssProperty.MixBlendMode, val)}
        onReset={() => resetStyle(CssProperty.MixBlendMode)}
        options={blendOptions}
        value={getCurrentStyle(CssProperty.MixBlendMode)}
      />
      <ValuePicker
        canReset={canReset(CssProperty.Opacity)}
        currentValue={getCurrentStyle(CssProperty.Opacity)}
        fixedUnit={CssUnit.PERCENT}
        label="Opacity"
        max={100}
        min={0}
        onChange={(val) => setStyle(CssProperty.Opacity, val)}
        onReset={() => resetStyle(CssProperty.Opacity)}
      />
      <SegmentedSelect label="Outline" options={outlineOptions} value="none" />
    </Col>
  )
}
