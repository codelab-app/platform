import {
  AppstoreOutlined,
  EyeInvisibleOutlined,
  GroupOutlined,
  OneToOneOutlined,
  PicCenterOutlined,
} from '@ant-design/icons'
import { SegmentedSelect } from '../components'
import { useStyle } from '../style.hook'
import { DisplayFlexOptions } from './DisplayFlexOptions'
import { DisplayGridOptions } from './DisplayGridOptions'
import { DefaultDisplayProperties, DisplayProperty } from './properties'

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

interface DisplayEditorProps {
  value: string
  onChange?(value: string): void
}

// TODO: Rotate icons based on direction
export const DisplayEditor = () => {
  const { getCurrentStyle, setStyle } = useStyle()

  const showFlexOptions =
    getCurrentStyle(DefaultDisplayProperties[DisplayProperty.Display]) ===
    'flex'

  const showGridOptions =
    getCurrentStyle(DefaultDisplayProperties[DisplayProperty.Display]) ===
    'grid'

  return (
    <>
      <SegmentedSelect
        label="Display"
        onChange={(value) => setStyle(DisplayProperty.Display, value)}
        options={displayOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperty.Display],
        )}
      />
      {showFlexOptions && <DisplayFlexOptions />}
      {showGridOptions && <DisplayGridOptions />}
    </>
  )
}
