import { IElement } from '@codelab/frontend/abstract/core'
import {
  ElementCssEditor,
  ElementHookSection,
  PropMapBindingSection,
  UpdateElementPropsForm,
  UpdateElementPropTransformationForm,
} from '@codelab/frontend/modules/element'
import { LoadingIndicator } from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
import tw from 'twin.macro'
import { useBuilderSelection } from '../containers/builderState'
import { usePropCompletion } from '../containers/usePropCompletion'
import { PropsInspectorTab } from './PropsInspectorTab'

const FormsGrid = ({ children }: React.PropsWithChildren<unknown>) => (
  <div
    tw="grid grid-cols-2 grid-rows-2 gap-4"
    style={{ gridTemplateRows: '1fr auto' }}
  >
    {children}
  </div>
)

const TabContainer = styled.div`
  height: 100%;
  display: flex;
  border-top: rgba(211, 211, 211, 0.21) 1px solid;

  .ant-layout-sider-children,
  .ant-tabs,
  .ant-tabs-content,
  .ant-tabs-content-holder,
  .ant-tabs-tabpane,
  .tab-panel {
    ${tw`flex flex-col flex-grow min-h-0 overflow-visible`}
  }

  .tab-panel {
    ${tw`px-4 py-2 `}
  }

  .tab-panel,
  .ant-tabs-content {
    overflow: auto;
  }
`

export interface MetaPaneBuilderProps {
  renderUpdateElementContent: (
    element: IElement,
    loadingIndicatorKey: string,
  ) => React.ReactNode
  tree: ElementTree
}

const loadingKey = 'metaPaneBuilderLoadingState'

export const MetaPaneBuilder = ({
  renderUpdateElementContent,
  tree,
}: MetaPaneBuilderProps) => {
  const {
    state: { selectedElement },
  } = useBuilderSelection()

  const { providePropCompletion } = usePropCompletion()

  if (!selectedElement) {
    return null
  }

  // Transform it, because we have the node in the state
  return (
    <Resizable
      enable={{ top: true }}
      maxHeight={400}
      defaultSize={{
        width: '100%',
        height: 320,
      }}
    >
      <TabContainer>
        <div css={tw`absolute bottom-0 right-0 m-8`}>
          <LoadingIndicator recoilKey={loadingKey} />
        </div>

        <Tabs defaultActiveKey={selectedElement.id + '_tab1'}>
          <Tabs.TabPane tab="Element" key={selectedElement.id + '_tab1'}>
            <FormsGrid>
              {renderUpdateElementContent(selectedElement, loadingKey)}
            </FormsGrid>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab="Props"
            key={selectedElement.id + '_tab2'}
            destroyInactiveTabPane // needed to update props if we change them in the prop inspector tab
          >
            {selectedElement.atom ? (
              <UpdateElementPropsForm
                elementId={selectedElement.id}
                key={selectedElement.id}
                loadingStateKey={loadingKey}
              />
            ) : (
              `Add an atom to this element to edit its props`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="CSS"
            key={selectedElement.id + '_tab3'}
          >
            {selectedElement.atom ? (
              <ElementCssEditor
                key={selectedElement.id}
                elementId={selectedElement.id}
                loadingStateKey={loadingKey}
              />
            ) : (
              `Add an atom to this page element to edit its CSS`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="Hooks"
            key={selectedElement.id + '_tab4'}
          >
            {selectedElement.atom ? (
              <ElementHookSection
                key={selectedElement.id}
                elementId={selectedElement.id}
              />
            ) : (
              `Add an atom to this page element to edit its hooks`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="Props Inspector"
            key={selectedElement.id + '_tab5'}
          >
            <PropsInspectorTab
              key={selectedElement.id}
              elementId={selectedElement.id}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="Prop mapping"
            key={selectedElement.id + '_tab6'}
          >
            <PropMapBindingSection
              key={selectedElement.id}
              elementId={selectedElement.id}
              tree={tree}
              providePropCompletion={(searchValue) =>
                selectedElement
                  ? providePropCompletion(searchValue, selectedElement.id)
                  : []
              }
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="Prop transformation"
            key={selectedElement.id + '_tab7'}
          >
            <UpdateElementPropTransformationForm
              key={selectedElement.id}
              elementId={selectedElement.id}
              loadingStateKey={loadingKey}
              tree={tree}
            />
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    </Resizable>
  )
}
