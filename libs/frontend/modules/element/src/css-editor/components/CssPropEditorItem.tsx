import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Checkbox, Col, Row } from 'antd'
import { useState } from 'react'

export const CssPropEditorItem = ({
  title: name,
  children,
  onChange,
  defaultChecked,
  enableCheckbox,
}: {
  title: string
  children: EmotionJSX.Element
  onChange?: (checked: boolean) => void
  defaultChecked?: boolean
  enableCheckbox?: boolean
}) => {
  const [checked, setChecked] = useState<boolean>(
    defaultChecked === undefined ? !enableCheckbox : defaultChecked,
  )

  return (
    <Row align="middle">
      <Col span={2}>
        <Checkbox
          defaultChecked={checked}
          disabled={!enableCheckbox}
          onChange={(e) => {
            onChange?.(e.target.checked)
            setChecked(e.target.checked)
          }}
          value={checked}
        />
      </Col>
      <Col span={8}>
        <p style={{ color: checked ? '#000000' : '#D1D1D1' }}>{name}</p>
      </Col>
      <Col span={14}>{children}</Col>
    </Row>
  )
}
