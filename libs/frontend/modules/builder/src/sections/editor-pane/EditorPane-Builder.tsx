import { CodeOutlined, DatabaseOutlined } from '@ant-design/icons'
import {
  CreateActionModal,
  DeleteActionsModal,
  StoreEditorPane,
  UpdateActionModal,
} from '@codelab/frontend/modules/store'
import {
  CreateFieldModal,
  DeleteFieldModal,
  InterfaceDefaultsModal,
  UpdateFieldModal,
} from '@codelab/frontend/modules/type'
import {
  CodeMirrorEditor,
  EditorPaneToggler,
  UseResizable,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  IActionService,
  IResourceService,
  IStore,
  IStoreService,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { propSafeStringify } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

const { TabPane } = Tabs

interface EditorPaneBuilderProps {
  resizable: UseResizable
  actionService: IActionService
  storeService: IStoreService
  typeService: ITypeService
  resourceService: IResourceService
  appStore: IStore
}

const Container = styled.div`
  height: 100%;

  .ant-tabs,
  .ant-tabs-content-holder,
  .ant-tabs-content {
    height: 100%;
  }
`

export const EditorPaneBuilder = observer(
  ({
    resizable,
    actionService,
    appStore,
    storeService,
    typeService,
    resourceService,
  }: EditorPaneBuilderProps) => {
    return (
      <>
        <Container>
          <Tabs
            defaultActiveKey="1"
            tabBarExtraContent={<EditorPaneToggler resizable={resizable} />}
          >
            <TabPane
              key="store"
              tab={
                <div>
                  <DatabaseOutlined title="Store" />
                  Store
                </div>
              }
            >
              <StoreEditorPane
                actionService={actionService}
                appStore={appStore}
                storeService={storeService}
                typeService={typeService}
              />
            </TabPane>
            <TabPane
              key="store-inspector"
              tab={
                <div>
                  <CodeOutlined title="Store inspector" />
                  Store Inspector
                </div>
              }
            >
              <CodeMirrorEditor
                language={CodeMirrorLanguage.Json}
                onChange={() => undefined}
                overrideStyles={css`
                  height: 95%;
                `}
                singleLine={false}
                title="Current props"
                value={propSafeStringify(appStore.state) ?? '{}'}
              />
            </TabPane>
          </Tabs>
        </Container>
        <CreateFieldModal typeService={typeService} />
        <UpdateFieldModal typeService={typeService} />
        <DeleteFieldModal typeService={typeService} />
        <InterfaceDefaultsModal typeService={typeService} />
        <CreateActionModal
          actionService={actionService}
          resourceService={resourceService}
          store={appStore}
        />
        <UpdateActionModal
          actionService={actionService}
          resourceService={resourceService}
        />
        <DeleteActionsModal actionService={actionService} />
      </>
    )
  },
)
