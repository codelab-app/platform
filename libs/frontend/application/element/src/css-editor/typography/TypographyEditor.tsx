import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  CloseOutlined,
  FontColorsOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
} from '@ant-design/icons'
import { Col } from 'antd'
import React from 'react'
import { LabeledSelect, SegmentedSelect, ValuePicker } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'
import { extractFontDataFromUrl } from './typography.util'

const weightOptions = [
  { label: '100 - Thin', value: '100' },
  { label: '200 - Extra Light', value: '200' },
  { label: '300 - Light', value: '300' },
  { label: '400 - Normal', value: '400' },
  { label: '500 - Medium', value: '500' },
  { label: '600 - Semi Bold', value: '600' },
  { label: '700 - Bold', value: '700' },
  { label: '800 - Extra Bold', value: '800' },
  { label: '900 - Black', value: '900' },
]

const alignOptions = [
  { icon: <AlignLeftOutlined />, value: 'left' },
  { icon: <AlignCenterOutlined />, value: 'center' },
  { icon: <AlignRightOutlined />, value: 'right' },
  // TODO: revisit icons
  { icon: <AlignLeftOutlined />, value: 'justify' },
]

const decorationOptions = [
  { icon: <CloseOutlined />, value: 'none' },
  {
    icon: <StrikethroughOutlined />,
    value: 'line-through',
  },
  {
    icon: <UnderlineOutlined />,
    value: 'underline',
  },
  {
    icon: <FontColorsOutlined />,
    value: 'overline',
  },
]

const DEFAULT_FONT = 'Montserrat'

export const TypographyEditor = () => {
  const fonts = extractFontDataFromUrl()
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  const makeFontOptions = () => {
    const options = fonts.map((fontData) => {
      return {
        label: fontData.family,
        value: `${fontData.family}`,
      }
    })

    const hasDefault = options.some((option) => option.value === DEFAULT_FONT)

    if (!hasDefault) {
      options.unshift({ label: DEFAULT_FONT, value: DEFAULT_FONT })
    }

    return options
  }

  const makeWeightOptions = () => {
    const value = getCurrentStyle(CssProperty.FontFamily)
    // When the font family changes we need to make sure that the selected weight is still valid
    const currentFont = fonts.find((font) => font.family === value)

    return (
      currentFont?.weights.map((weight) => {
        return {
          label:
            weightOptions.find((option) => option.value === weight)?.label ??
            weight,
          value: weight,
        }
      }) ?? []
    )
  }

  return (
    <Col className="space-y-2">
      <LabeledSelect
        canReset={canReset(CssProperty.FontFamily)}
        label="Font"
        onChange={(val) => setStyle(CssProperty.FontFamily, val)}
        onReset={() => resetStyle(CssProperty.FontFamily)}
        options={makeFontOptions()}
        value={getCurrentStyle(CssProperty.FontFamily)}
      />
      <LabeledSelect
        canReset={canReset(CssProperty.FontWeight)}
        label="Weight"
        onChange={(val) => setStyle(CssProperty.FontWeight, val)}
        onReset={() => resetStyle(CssProperty.FontWeight)}
        options={makeWeightOptions()}
        value={getCurrentStyle(CssProperty.FontWeight)}
      />
      {/* <Row */}
      {/*  align="middle" */}
      {/*  className="space-x-2" */}
      {/*  justify="space-between" */}
      {/*  wrap={false} */}
      {/* > */}
      <ValuePicker
        canReset={canReset(CssProperty.FontSize)}
        currentValue={getCurrentStyle(CssProperty.FontSize)}
        label="Size"
        onChange={(val) => setStyle(CssProperty.FontSize, val)}
        onReset={() => resetStyle(CssProperty.FontSize)}
      />
      <ValuePicker
        canReset={canReset(CssProperty.LineHeight)}
        currentValue={getCurrentStyle(CssProperty.LineHeight)}
        label="Height"
        onChange={(val) => setStyle(CssProperty.LineHeight, val)}
        onReset={() => resetStyle(CssProperty.LineHeight)}
      />
      {/* </Row> */}
      <ColorPicker
        onChange={(val) => setStyle(CssProperty.Color, val)}
        value={getCurrentStyle(CssProperty.Color)}
      />
      <SegmentedSelect
        canReset={canReset(CssProperty.TextAlign)}
        label="Align"
        onChange={(val) => setStyle(CssProperty.TextAlign, val)}
        onReset={() => resetStyle(CssProperty.TextAlign)}
        options={alignOptions}
        value={getCurrentStyle(CssProperty.TextAlign)}
      />
      <SegmentedSelect
        canReset={canReset(CssProperty.TextDecoration)}
        label="Decoration"
        onChange={(val) => setStyle(CssProperty.TextDecoration, val)}
        onReset={() => resetStyle(CssProperty.TextDecoration)}
        options={decorationOptions}
        value={getCurrentStyle(CssProperty.TextDecoration)}
      />
    </Col>
  )
}
