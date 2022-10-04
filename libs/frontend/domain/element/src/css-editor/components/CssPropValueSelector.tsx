import { DownOutlined } from '@ant-design/icons'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Button, Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { makeMenu } from '../utils'
import { CssPropEditorItem } from './CssPropEditorItem'

interface PropValueSelectorProps {
  name: string
  currentValue: string
  options: Array<string>
  onClick: (val: string) => void | undefined
}

export const CssPropValueSelector = observer(
  ({ name, currentValue, options, onClick }: PropValueSelectorProps) => {
    const [overlay, setOverlay] = useState<EmotionJSX.Element>(
      makeMenu(options, onClick),
    )

    useEffect(() => {
      setOverlay(makeMenu(options, onClick))
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
