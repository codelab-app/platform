import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'

import { isComponent, isPage } from '@codelab/frontend/abstract/domain'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { IPageKind } from '@codelab/shared/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gqlgen'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'

interface InspectorPanelProps {
  containerNode: IComponentModel | IPageModel
}

export const InspectorPanel = observer<InspectorPanelProps>(
  ({ containerNode }) => {
    const { builderService, rendererService } = useApplicationStore()
    const renderer = rendererService.activeRenderer?.current
    const runtimeContainerNode = renderer?.runtimeContainerNode
    const runtimeStore = runtimeContainerNode?.runtimeStore
    const runtimeProviderStore = runtimeStore?.runtimeProviderStore?.current

    if (!runtimeStore) {
      return null
    }

    return (
      <Collapse ghost size="small">
        <Collapse.Panel header="Local Store" key="localStore">
          <CodeMirrorEditor
            className="mt-1"
            editable={false}
            language={CodeMirrorLanguage.Json}
            onChange={() => undefined}
            singleLine={false}
            title="Local Store"
            value={runtimeStore.jsonString}
          />
        </Collapse.Panel>
        {isComponent(containerNode) ? (
          <Collapse.Panel header="Component Store" key="componentStore">
            <CodeMirrorEditor
              className="mt-1"
              editable={false}
              language={CodeMirrorLanguage.Json}
              onChange={() => undefined}
              singleLine={false}
              title="Component Store"
              value={runtimeStore.jsonString}
            />
          </Collapse.Panel>
        ) : (
          ''
        )}
        {runtimeProviderStore &&
        isPage(containerNode) &&
        containerNode.kind === IPageKind.Regular ? (
          <Collapse.Panel header="Root Store" key="rootStore">
            <CodeMirrorEditor
              className="mt-1"
              editable={false}
              language={CodeMirrorLanguage.Json}
              onChange={() => undefined}
              singleLine={false}
              title="Root Store"
              value={runtimeProviderStore.jsonString}
            />
          </Collapse.Panel>
        ) : (
          ''
        )}
      </Collapse>
    )
  },
)

InspectorPanel.displayName = 'InspectorPanel'
