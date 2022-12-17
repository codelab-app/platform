import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Checkbox, Col, Row } from 'antd'
import { useState } from 'react'

interface CssPropEditorItemProps {
  title: string
  children: EmotionJSX.Element
  onCheck?: (checked: boolean) => void
  checked?: boolean
  enableCheckbox?: boolean
}

export const CssPropEditorItem = ({
  title: name,
  children,
  onCheck,
  checked: defaultChecked,
  enableCheckbox,
}: CssPropEditorItemProps) => {
  const [checked, setChecked] = useState<boolean>(
    defaultChecked === undefined ? !enableCheckbox : defaultChecked,
  )

  return (
    <Row align="middle">
      <Col span={2}>
        <Checkbox
          checked={checked}
          defaultChecked={checked}
          disabled={!enableCheckbox}
          onChange={(e) => {
            onCheck?.(e.target.checked)
            setChecked(e.target.checked)
          }}
        />
      </Col>
      <Col span={8}>
        <p style={{ color: checked ? '#000000' : '#D1D1D1' }}>{name}</p>
      </Col>
      <Col span={14}>{children}</Col>
    </Row>
  )
}
