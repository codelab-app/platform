import { CodeOutlined, DatabaseOutlined } from '@ant-design/icons'
import { StoreEditorPane } from '@codelab/frontend/modules/store'
import {
  CodeMirrorEditor,
  EditorPaneToggler,
  UseResizable,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  IActionService,
  IStore,
  IStoreService,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'

const { TabPane } = Tabs

const onChange = (key: string) => {
  console.log(key)
}

interface EditorPaneBuilderProps {
  resizable: UseResizable
  actionService: IActionService
  storeService: IStoreService
  typeService: ITypeService
  appStore: IStore
  state: any
}

export const EditorPaneBuilder = observer(
  ({
    resizable,
    actionService,
    appStore,
    storeService,
    typeService,
    state,
  }: EditorPaneBuilderProps) => {
    return (
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
              value={JSON.stringify(toJS(state), null, '\t') ?? '{'}
            />
          </TabPane>
        </Tabs>
      </Container>
    )
  },
)
