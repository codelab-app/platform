import { CaretRightOutlined } from '@ant-design/icons'
import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { BoxShadow } from './BoxShadow'

const { Panel } = Collapse

type ShadowsEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

export const ShadowsEditor = observer(
  ({ element, guiCssObj }: ShadowsEditorProps) => {
    return (
      <Collapse
        bordered={false}
        className="site-collapse-custom-collapse"
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel
          className="site-collapse-custom-panel"
          header="BoxShadow"
          key="1"
        >
          <BoxShadow element={element} guiCssObj={guiCssObj} />
        </Panel>
      </Collapse>
    )
  },
)
