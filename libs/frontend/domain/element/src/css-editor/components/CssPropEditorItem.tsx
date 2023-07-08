import { Checkbox, Col, Row } from 'antd'
import { useState } from 'react'

interface CssPropEditorItemProps {
  checked?: boolean
  children: React.ReactElement
  enableCheckbox?: boolean
  title: string
  onCheck?(checked: boolean): void
}

export const CssPropEditorItem = ({
  checked: defaultChecked,
  children,
  enableCheckbox,
  onCheck,
  title: name,
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
          onChange={(event) => {
            onCheck?.(event.target.checked)
            setChecked(event.target.checked)
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
