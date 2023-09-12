import {
  AppstoreOutlined,
  EyeInvisibleOutlined,
  GroupOutlined,
  OneToOneOutlined,
  PicCenterOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { SegmentedSelect } from '../components/SegmentedSelect'
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

interface DisplayEditorProps {
  value: string
  onChange?(value: string): void
}

// TODO: Rotate icons based on direction
export const DisplayEditor = () => {
  const [display, setDisplay] = useState('flex')

  return (
    <>
      <SegmentedSelect
        label="Display"
        onChange={setDisplay}
        options={displayOptions}
        value={display}
      />
      {display === 'flex' && <DisplayFlexOptions />}
      {display === 'grid' && <DisplayGridOptions />}
    </>
  )
}
