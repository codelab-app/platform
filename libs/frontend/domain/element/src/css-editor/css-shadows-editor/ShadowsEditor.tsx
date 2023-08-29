import { CaretRightOutlined } from '@ant-design/icons'
import type { CssMap, IElement } from '@codelab/frontend/abstract/core'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { BoxShadow } from './BoxShadow'
import { TextShadow } from './TextShadow'

const { Panel } = Collapse

interface ShadowsEditorProps {
  element: IElement
  guiCssObj: CssMap
}

export const ShadowsEditor = observer(
  ({ element, guiCssObj }: ShadowsEditorProps) => {
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="BoxShadow" key="1">
          <BoxShadow element={element} guiCssObj={guiCssObj} />
        </Panel>
        <Panel header="TextShadow" key="2">
          <TextShadow element={element} guiCssObj={guiCssObj} />
        </Panel>
      </Collapse>
    )
  },
)
