import {
  ElementCssEditor,
  ElementFragment,
  ElementHookSection,
  PropMapBindingSection,
  UpdateElementPropsForm,
  UpdateElementPropTransformationForm,
} from '@codelab/frontend/modules/element'
import {
  LoadingIndicator,
  UseTrackLoadingPromises,
  useTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { useDashboardLayout } from '@codelab/frontend/view/templates'
import { ElementTree } from '@codelab/shared/core'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { useBuilderSelectedElement, usePropCompletion } from '../../hooks'
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

  .ant-tabs-nav {
    ${tw`px-4`}
  }

  .ant-layout-sider-children,
  .ant-tabs,
  .ant-tabs-content,
  .ant-tabs-content-holder,
  .ant-tabs-tabpane,
  .tab-panel {
    ${tw`flex flex-col flex-grow min-h-0 overflow-visible`}
  }

  .tab-panel,
  .ant-tabs-content {
    ${tw`px-4 py-2`}
  }

  .suggest-details-container,
  .editor-widget,
  .monaco-sash,
  .monaco-list {
    z-index: 1000;
  }
`

export interface MetaPaneBuilderProps {
  renderUpdateElementContent: (
    element: ElementFragment,
    trackPromises: UseTrackLoadingPromises,
  ) => React.ReactNode
  tree: ElementTree
}

export const MetaPaneBuilder = ({
  renderUpdateElementContent,
  tree,
}: MetaPaneBuilderProps) => {
  const { selectedElement } = useBuilderSelectedElement()
  const { closeMetaPane, openMetaPane } = useDashboardLayout()
  const { providePropCompletion } = usePropCompletion()
  const trackPromises = useTrackLoadingPromises()

  useEffect(() => {
    if (selectedElement) {
      openMetaPane()
    } else {
      closeMetaPane()
    }
  }, [closeMetaPane, openMetaPane, selectedElement])

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
          <LoadingIndicator {...trackPromises} />
        </div>

        <Tabs defaultActiveKey={selectedElement.id + '_tab1'}>
          <Tabs.TabPane
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Element"
            key={selectedElement.id + '_tab1'}
          >
            <FormsGrid>
              {renderUpdateElementContent(selectedElement, trackPromises)}
            </FormsGrid>
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Props"
            key={selectedElement.id + '_tab2'}
            destroyInactiveTabPane // needed to update props if we change them in the prop inspector tab
          >
            {selectedElement.atom ? (
              <UpdateElementPropsForm
                elementId={selectedElement.id}
                key={selectedElement.id}
                trackPromises={trackPromises}
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
                trackPromises={trackPromises}
              />
            ) : (
              `Add an atom to this page element to edit its CSS`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Hooks"
            key={selectedElement.id + '_tab4'}
          >
            <ElementHookSection
              key={selectedElement.id}
              elementId={selectedElement.id}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Props Inspector"
            key={selectedElement.id + '_tab5'}
          >
            <PropsInspectorTab
              key={selectedElement.id}
              elementId={selectedElement.id}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            style={{ overflow: 'auto', maxHeight: '100%' }}
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
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Prop transformation"
            key={selectedElement.id + '_tab7'}
          >
            <UpdateElementPropTransformationForm
              key={selectedElement.id}
              elementId={selectedElement.id}
              trackPromises={trackPromises}
              tree={tree}
            />
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    </Resizable>
  )
}
