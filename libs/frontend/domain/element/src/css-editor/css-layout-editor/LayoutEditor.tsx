import { CaretRightOutlined } from '@ant-design/icons'
import type { CssMap, IElement } from '@codelab/frontend/abstract/core'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { DisplayEditor } from './DisplayEditor'
import { MarginsEditor } from './MarginsEditor'
import { PaddingEditor } from './PaddingEditor'
import { PositionEditor } from './PositionEditor'
import { SizeEditor } from './SizeEditor'

const { Panel } = Collapse

interface LayoutEditorProps {
  element: IElement
  guiCssObj: CssMap
}

export const LayoutEditor = observer(
  ({ element, guiCssObj }: LayoutEditorProps) => {
    return (
      <Collapse
        bordered={false}
        className="site-collapse-custom-collapse"
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel className="site-collapse-custom-panel" header="Display" key="1">
          <DisplayEditor element={element} guiCssObj={guiCssObj} />
        </Panel>
        <Panel className="site-collapse-custom-panel" header="Margins" key="2">
          <MarginsEditor element={element} guiCssObj={guiCssObj} />
        </Panel>
        <Panel className="site-collapse-custom-panel" header="Padding" key="3">
          <PaddingEditor element={element} guiCssObj={guiCssObj} />
        </Panel>
        <Panel className="site-collapse-custom-panel" header="Size" key="4">
          <SizeEditor element={element} guiCssObj={guiCssObj} />
        </Panel>
        <Panel className="site-collapse-custom-panel" header="Position" key="5">
          <PositionEditor element={element} guiCssObj={guiCssObj} />
        </Panel>
      </Collapse>
    )
  },
)
