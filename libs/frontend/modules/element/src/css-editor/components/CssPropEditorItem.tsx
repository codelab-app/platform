import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Checkbox, Col, Row } from 'antd'
import { useEffect, useState } from 'react'

export const CssPropEditorItem = ({
  title: name,
  children,
  onChange,
  checked,
  enableCheckbox,
}: {
  title: string
  children: EmotionJSX.Element
  onChange?: (checked: boolean) => void
  checked?: boolean
  enableCheckbox?: boolean
}) => {
  const [checkedState, setCheckedState] = useState<boolean>(
    checked === undefined ? !enableCheckbox : checked,
  )

  useEffect(() => {
    onChange?.(checkedState)
  }, [checkedState, onChange])

  return (
    <Row align="middle">
      <Col span={2}>
        <Checkbox
          defaultChecked={checkedState}
          disabled={!enableCheckbox}
          onChange={(e) => setCheckedState(e.target.checked)}
          value={checkedState}
        />
      </Col>
      <Col span={8}>
        <p style={{ color: checkedState ? '#000000' : '#D1D1D1' }}>{name}</p>
      </Col>
      <Col span={14}>{children}</Col>
    </Row>
  )
}
