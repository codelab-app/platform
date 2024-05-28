import React from 'react'
import { SegmentedSelect } from '../components'
import { CssProperty, Display } from '../css'
import { useStyle } from '../style.hook'
import { DisplayFlexOptions } from './DisplayFlexOptions'
import { DisplayGridOptions } from './DisplayGridOptions'
import { DisplayIcon } from './Icons'

const displayOptions = [
  {
    icon: <DisplayIcon display={Display.Block} />,
    title: 'Block',
    value: Display.Block,
  },
  {
    icon: <DisplayIcon display={Display.Flex} />,
    title: 'Flex',
    value: Display.Flex,
  },
  {
    icon: <DisplayIcon display={Display.Grid} />,
    title: 'Grid',
    value: Display.Grid,
  },
  {
    icon: <DisplayIcon display={Display.InlineBlock} />,
    title: 'Inline Block',
    value: Display.InlineBlock,
  },
  {
    icon: <DisplayIcon display={Display.Inline} />,
    title: 'Inline',
    value: Display.Inline,
  },
  {
    icon: <DisplayIcon display={Display.None} />,
    title: 'None',
    value: Display.None,
  },
]

export const DisplayEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()
  const showFlexOptions = getCurrentStyle(CssProperty.Display) === 'flex'
  const showGridOptions = getCurrentStyle(CssProperty.Display) === 'grid'

  return (
    <>
      <SegmentedSelect
        canReset={canReset(CssProperty.Display)}
        label="Display"
        onChange={(value) => {
          setStyle(CssProperty.Display, value)
        }}
        onReset={() => {
          resetStyle(CssProperty.Display)
        }}
        options={displayOptions}
        value={getCurrentStyle(CssProperty.Display)}
      />
      {showFlexOptions && <DisplayFlexOptions />}
      {showGridOptions && <DisplayGridOptions />}
    </>
  )
}
