import { Tabs } from 'antd'
import { DOMTree } from './DOMTree'

const { TabPane } = Tabs

const onChange = (key: string) => {
  console.log(key)
}

export const BuilderDemo = () => {
  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      <TabPane key="1" tab="Builder View">
        <DOMTree />
      </TabPane>
      <TabPane key="2" tab="Code Equivalent">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
}
