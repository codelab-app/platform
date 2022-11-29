import { CodeOutlined, DatabaseOutlined } from '@ant-design/icons'
import {
  IActionService,
  IFieldService,
  IResourceService,
  IStore,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import {
  CreateActionModal,
  DeleteActionsModal,
  StoreEditorPane,
  UpdateActionModal,
} from '@codelab/frontend/domain/store'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/domain/type'
import {
  CodeMirrorEditor,
  EditorPaneToggler,
  UseResizable,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

const { TabPane } = Tabs

interface EditorPaneBuilderProps {
  resizable: UseResizable
  actionService: IActionService
  fieldService: IFieldService
  typeService: ITypeService
  resourceService: IResourceService
  appStore: IStore
}

const Container = styled.div`
  height: 100%;

  .ant-tabs,
  .ant-tabs-content-holder,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: 100%;
  }
`

export const EditorPaneBuilder = observer(
  ({
    resizable,
    actionService,
    appStore,
    fieldService,
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
                fieldService={fieldService}
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
                value={appStore.state.jsonString}
              />
            </TabPane>
          </Tabs>
        </Container>
        <CreateFieldModal
          fieldService={fieldService}
          typeService={typeService}
        />
        <UpdateFieldModal
          fieldService={fieldService}
          typeService={typeService}
        />
        <DeleteFieldModal fieldService={fieldService} />
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
