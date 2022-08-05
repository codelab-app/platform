import { Col, Row, Tabs } from 'antd'
import { ButtonProps } from './ButtonProps'
import { DOMTree } from './DOMTree'
import { DOMTreeCode } from './DOMTreeCode'

const { TabPane } = Tabs

const onChange = (key: string) => {
  console.log(key)
}

export const BuilderDemo = () => {
  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      <TabPane key="1" tab="Builder View">
        <Row>
          <Col span={6}>
            <DOMTree />
          </Col>
          <Col span={12}>
            <ButtonProps />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="2" tab="Code Equivalent">
        <DOMTreeCode />
      </TabPane>
    </Tabs>
  )
}
