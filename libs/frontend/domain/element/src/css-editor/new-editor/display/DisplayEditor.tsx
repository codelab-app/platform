import {
  AppstoreOutlined,
  EyeInvisibleOutlined,
  GroupOutlined,
  OneToOneOutlined,
  PicCenterOutlined,
} from '@ant-design/icons'
import { SegmentedSelect } from '../components'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'
import { DisplayFlexOptions } from './DisplayFlexOptions'
import { DisplayGridOptions } from './DisplayGridOptions'

const displayOptions = [
  {
    icon: <GroupOutlined />,
    value: 'block',
  },
  {
    icon: <OneToOneOutlined />,
    value: 'flex',
  },
  {
    icon: <AppstoreOutlined />,
    value: 'grid',
  },
  {
    icon: <PicCenterOutlined rotate={90} />,
    value: 'inline-block',
  },
  {
    icon: <PicCenterOutlined />,
    value: 'inline',
  },
  {
    icon: <EyeInvisibleOutlined />,
    value: 'None',
  },
]

// TODO: Rotate icons based on direction
export const DisplayEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()
  const showFlexOptions = getCurrentStyle(CssProperty.Display) === 'flex'
  const showGridOptions = getCurrentStyle(CssProperty.Display) === 'grid'

  return (
    <>
      <SegmentedSelect
        canReset={canReset(CssProperty.Display)}
        label="Display"
        onChange={(value) => setStyle(CssProperty.Display, value)}
        onReset={() => resetStyle(CssProperty.Display)}
        options={displayOptions}
        value={getCurrentStyle(CssProperty.Display)}
      />
      {showFlexOptions && <DisplayFlexOptions />}
      {showGridOptions && <DisplayGridOptions />}
    </>
  )
}
