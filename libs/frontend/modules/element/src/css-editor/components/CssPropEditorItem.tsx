import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Col, Row } from 'antd'

export const CssPropEditorItem = ({
  title: name,
  children,
}: {
  title: string
  children: EmotionJSX.Element
}) => (
  <Row>
    <Col span={8}>{name}</Col>
    <Col span={16}>{children}</Col>
  </Row>
)
