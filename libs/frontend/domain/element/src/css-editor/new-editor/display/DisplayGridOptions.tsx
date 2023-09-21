import { Col, Divider } from 'antd'
import { SegmentedSelect } from '../components'
import { CssProperty, FlexAlignItems, GridAlign } from '../css'
import { useStyle } from '../style.hook'
import { DistributeIcon, FlexAlignIcon } from './Icons'

const getAlignItemsOptions = (isVertical?: boolean) => {
  const title = isVertical ? 'Align Items: ' : 'Justify Items: '

  return [
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Start} vertical={isVertical} />
      ),
      title: `${title} Start`,
      value: FlexAlignItems.Start,
    },
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Center} vertical={isVertical} />
      ),
      title: `${title} Center`,
      value: FlexAlignItems.Center,
    },
    {
      icon: <FlexAlignIcon align={FlexAlignItems.End} vertical={isVertical} />,
      title: `${title} End`,
      value: FlexAlignItems.End,
    },
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Stretch} vertical={isVertical} />
      ),
      title: `${title} Stretch`,
      value: FlexAlignItems.Stretch,
    },
    {
      icon: (
        <FlexAlignIcon align={FlexAlignItems.Baseline} vertical={isVertical} />
      ),
      title: `${title} Baseline`,
      value: FlexAlignItems.Baseline,
    },
  ]
}

const getJustifyItemsOptions = () => getAlignItemsOptions(true)

const getAlignContentOptions = (isVertical?: boolean) => {
  const title = isVertical ? 'Align Content: ' : 'Justify Content: '

  return [
    {
      icon: <DistributeIcon align={GridAlign.Start} vertical={isVertical} />,
      title: `${title} Start`,
      value: GridAlign.Start,
    },
    {
      icon: <DistributeIcon align={GridAlign.Center} vertical={isVertical} />,
      title: `${title} Center`,
      value: GridAlign.Center,
    },
    {
      icon: <DistributeIcon align={GridAlign.End} vertical={isVertical} />,
      title: `${title} End`,
      value: GridAlign.End,
    },
    {
      icon: <DistributeIcon align={GridAlign.Stretch} vertical={isVertical} />,
      title: `${title} Stretch`,
      value: GridAlign.Stretch,
    },
    {
      icon: (
        <DistributeIcon align={GridAlign.SpaceBetween} vertical={isVertical} />
      ),
      title: `${title} Space Between`,
      value: GridAlign.SpaceBetween,
    },
    {
      icon: (
        <DistributeIcon align={GridAlign.SpaceAround} vertical={isVertical} />
      ),
      title: `${title} Space Around`,
      value: GridAlign.SpaceAround,
    },
  ]
}

export const DisplayGridOptions = () => {
  const { getCurrentStyle, setStyle } = useStyle()

  // TODO: add Edit Grid option
  return (
    <Col className="space-y-2">
      <Divider className="my-2" />
      <SegmentedSelect
        label="Align"
        onChange={(val) => setStyle(CssProperty.AlignItems, val)}
        options={getAlignItemsOptions()}
        value={getCurrentStyle(CssProperty.AlignItems)}
      />
      <SegmentedSelect
        label=""
        onChange={(val) => setStyle(CssProperty.JustifyItems, val)}
        options={getJustifyItemsOptions()}
        value={getCurrentStyle(CssProperty.JustifyItems)}
      />
      <SegmentedSelect
        label="Distribute"
        onChange={(val) => setStyle(CssProperty.AlignContent, val)}
        options={getAlignContentOptions()}
        value={getCurrentStyle(CssProperty.AlignContent)}
      />
      <SegmentedSelect
        label=""
        onChange={(val) => setStyle(CssProperty.JustifyContent, val)}
        options={getAlignContentOptions(true)}
        value={getCurrentStyle(CssProperty.JustifyContent)}
      />
    </Col>
  )
}
