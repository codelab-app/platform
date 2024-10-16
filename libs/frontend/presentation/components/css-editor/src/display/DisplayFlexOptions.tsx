import { Col, Divider, Row } from 'antd'

import { SegmentedSelect, ValuePicker } from '../components'
import { CssProperty, FlexAlignItems, FlexJustifyItems } from '../css'
import { useStyle } from '../style.hook'
import { FlexAlignIcon, FlexJustifyIcon } from './Icons'

const directionOptions = [
  {
    label: 'Horizontal',
    value: 'row',
  },
  {
    label: 'Vertical',
    value: 'column',
  },
]

const wrapOptions = [
  {
    label: "Don't Wrap",
    value: 'nowrap',
  },
  {
    label: 'Wrap',
    value: 'wrap',
  },
]

const getJustifyOptions = (isVertical?: boolean) => {
  return [
    {
      icon: (
        <FlexJustifyIcon
          justify={FlexJustifyItems.Start}
          vertical={!isVertical}
        />
      ),
      title: 'Start',
      value: FlexJustifyItems.Start,
    },
    {
      icon: (
        <FlexJustifyIcon
          justify={FlexJustifyItems.Center}
          vertical={!isVertical}
        />
      ),
      title: 'Center',
      value: FlexJustifyItems.Center,
    },
    {
      icon: (
        <FlexJustifyIcon
          justify={FlexJustifyItems.End}
          vertical={!isVertical}
        />
      ),
      title: 'End',
      value: FlexJustifyItems.End,
    },
    {
      icon: (
        <FlexJustifyIcon
          justify={FlexJustifyItems.SpaceBetween}
          vertical={!isVertical}
        />
      ),
      title: 'Space Between',
      value: FlexJustifyItems.SpaceBetween,
    },
    {
      icon: (
        <FlexJustifyIcon
          justify={FlexJustifyItems.SpaceAround}
          vertical={!isVertical}
        />
      ),
      title: 'Space Around',
      value: FlexJustifyItems.SpaceAround,
    },
  ]
}

const getAlignOptions = (isVertical: boolean) => {
  return [
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Start} vertical={isVertical} />
      ),
      title: 'Start',
      value: FlexAlignItems.Start,
    },
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Center} vertical={isVertical} />
      ),
      title: 'Center',
      value: FlexAlignItems.Center,
    },
    {
      icon: <FlexAlignIcon align={FlexAlignItems.End} vertical={isVertical} />,
      title: 'End',
      value: FlexAlignItems.End,
    },
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Stretch} vertical={isVertical} />
      ),
      title: 'Stretch',
      value: FlexAlignItems.Stretch,
    },
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Baseline} vertical={isVertical} />
      ),
      title: 'Baseline',
      value: FlexAlignItems.Baseline,
    },
  ]
}

export const DisplayFlexOptions = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  const isHorizontal = () =>
    getCurrentStyle(CssProperty.FlexDirection) === 'row' ||
    getCurrentStyle(CssProperty.FlexDirection) === 'row-reverse'

  return (
    <Col className="space-y-2">
      <Divider className="my-2" />
      <SegmentedSelect
        canReset={canReset(CssProperty.FlexDirection)}
        label="Direction"
        onChange={(value) => {
          setStyle(CssProperty.FlexDirection, value)
        }}
        onReset={() => {
          resetStyle(CssProperty.FlexDirection)
        }}
        options={directionOptions}
        value={getCurrentStyle(CssProperty.FlexDirection)}
      />
      <SegmentedSelect
        canReset={canReset(CssProperty.JustifyContent)}
        label="Justify"
        onChange={(value) => {
          setStyle(CssProperty.JustifyContent, value)
        }}
        onReset={() => {
          resetStyle(CssProperty.JustifyContent)
        }}
        options={getJustifyOptions(isHorizontal())}
        value={getCurrentStyle(CssProperty.JustifyContent)}
      />
      <SegmentedSelect
        canReset={canReset(CssProperty.AlignItems)}
        label="Align"
        onChange={(value) => {
          setStyle(CssProperty.AlignItems, value)
        }}
        onReset={() => {
          resetStyle(CssProperty.AlignItems)
        }}
        options={getAlignOptions(!isHorizontal())}
        value={getCurrentStyle(CssProperty.AlignItems)}
      />
      <Row align="middle" justify="space-between" wrap={false}>
        <Col className="text-[11px]" span={5}>
          Gap
        </Col>
        <Col>
          <Row className="space-x-1" wrap={false}>
            <ValuePicker
              canReset={canReset(CssProperty.RowGap)}
              currentValue={getCurrentStyle(CssProperty.RowGap)}
              label="Row"
              onChange={(value) => {
                setStyle(CssProperty.RowGap, value)
              }}
              onReset={() => {
                resetStyle(CssProperty.RowGap)
              }}
              wideLabel
            />
            <ValuePicker
              canReset={canReset(CssProperty.ColumnGap)}
              currentValue={getCurrentStyle(CssProperty.ColumnGap)}
              label="Col"
              onChange={(value) => {
                setStyle(CssProperty.ColumnGap, value)
              }}
              onReset={() => {
                resetStyle(CssProperty.ColumnGap)
              }}
              wideLabel
            />
          </Row>
        </Col>
      </Row>
      <Divider className="my-2" />
      <SegmentedSelect
        canReset={canReset(CssProperty.FlexWrap)}
        label="Children"
        onChange={(value) => {
          setStyle(CssProperty.FlexWrap, value)
        }}
        onReset={() => {
          resetStyle(CssProperty.FlexWrap)
        }}
        options={wrapOptions}
        value={getCurrentStyle(CssProperty.FlexWrap)}
      />
    </Col>
  )
}
