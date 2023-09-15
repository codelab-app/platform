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
import { LabeledSelect, SegmentedSelect, ValuePicker } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import { useStyle } from '../style.hook'
import { DefaultTypographyProperties, TypographyProperty } from './properties'
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
  const { getCurrentStyle, setStyle } = useStyle()

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
    const value = getCurrentStyle(
      DefaultTypographyProperties[TypographyProperty.Family],
    )

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
        label="Font"
        onChange={(val) => setStyle(TypographyProperty.Family, val)}
        options={makeFontOptions()}
        value={getCurrentStyle(
          DefaultTypographyProperties[TypographyProperty.Family],
        )}
      />
      <LabeledSelect
        label="Weight"
        onChange={(val) => setStyle(TypographyProperty.Weight, val)}
        options={makeWeightOptions()}
        value={getCurrentStyle(
          DefaultTypographyProperties[TypographyProperty.Weight],
        )}
      />
      {/* <Row */}
      {/*  align="middle" */}
      {/*  className="space-x-2" */}
      {/*  justify="space-between" */}
      {/*  wrap={false} */}
      {/* > */}
      <ValuePicker
        currentValue={getCurrentStyle(
          DefaultTypographyProperties[TypographyProperty.Size],
        )}
        label="Size"
        onChange={(val) => setStyle(TypographyProperty.Size, val)}
      />
      <ValuePicker
        currentValue={getCurrentStyle(
          DefaultTypographyProperties[TypographyProperty.Height],
        )}
        label="Height"
        onChange={(val) => setStyle(TypographyProperty.Height, val)}
      />
      {/* </Row> */}
      <ColorPicker
        onChange={(val) => setStyle(TypographyProperty.Color, val)}
        value={getCurrentStyle(
          DefaultTypographyProperties[TypographyProperty.Color],
        )}
      />
      <SegmentedSelect
        label="Align"
        onChange={(val) => setStyle(TypographyProperty.Align, val)}
        options={alignOptions}
        value={getCurrentStyle(
          DefaultTypographyProperties[TypographyProperty.Align],
        )}
      />
      <SegmentedSelect
        label="Decoration"
        onChange={(val) => setStyle(TypographyProperty.Decoration, val)}
        options={decorationOptions}
        value={getCurrentStyle(
          DefaultTypographyProperties[TypographyProperty.Decoration],
        )}
      />
    </Col>
  )
}
