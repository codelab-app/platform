import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { MakeMenu } from '../utils'
import { CssPropEditorItem } from './CssPropEditorItem'

interface PropValueSelectorProps {
  currentValue: string
  name: string
  options: Array<string>
  onClick(val: string): undefined | void
}

export const CssPropValueSelector = observer(
  ({ currentValue, name, onClick, options }: PropValueSelectorProps) => {
    const [overlay, setOverlay] = useState<ReactElement>(
      MakeMenu(options, onClick),
    )

    useEffect(() => {
      setOverlay(MakeMenu(options, onClick))
    }, [onClick, options])

    return (
      <CssPropEditorItem title={name}>
        <Dropdown overlay={overlay}>
          <Button style={{ width: '100%' }}>
            <span style={{ width: '90%' }}>{currentValue}</span>
            <DownOutlined style={{ width: '10%' }} />
          </Button>
        </Dropdown>
      </CssPropEditorItem>
    )
  },
)
