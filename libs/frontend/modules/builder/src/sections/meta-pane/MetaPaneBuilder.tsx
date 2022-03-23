import { WithAtomService } from '@codelab/frontend/modules/atom'
import {
  ElementHookSection,
  PropMapBindingSection,
} from '@codelab/frontend/modules/element'
import { WithTypeService } from '@codelab/frontend/modules/type'
import {
  LoadingIndicator,
  UseTrackLoadingPromises,
  useTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { useBuilderSelectedElement, usePropCompletion } from '../../hooks'
import { PropsInspectorTab } from './PropsInspectorTab'

const FormsGrid = ({ children }: React.PropsWithChildren<unknown>) => (
  <div
    style={{ gridTemplateRows: '1fr auto' }}
    tw="grid grid-cols-2 grid-rows-2 gap-4"
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
    z-index: 50;
  }
`

export type MetaPaneBuilderProps = {
  renderUpdateElementContent: (
    element: IElement,
    trackPromises: UseTrackLoadingPromises,
  ) => React.ReactNode
  tree: ElementTree
} & WithTypeService &
  WithAtomService

/**
 *  the props form,
 * a component will have an interface.
 * The process to transform an interface (typeGraph) into a form is fetching the typeGraph of an interface,
 * transforming it to TypeTree using useTypeTree,
 * and passing the tree to the InterfaceForm
 */
export const MetaPaneBuilder = observer(
  ({
    renderUpdateElementContent,
    tree,
    typeService,
    atomService,
  }: MetaPaneBuilderProps) => {
    const { selectedElement } = useBuilderSelectedElement()
    const { providePropCompletion } = usePropCompletion()
    const trackPromises = useTrackLoadingPromises()

    if (!selectedElement) {
      return null
    }

    // Transform it, because we have the node in the state
    return (
      <TabContainer>
        <div css={tw`absolute bottom-0 right-0 m-8`}>
          <LoadingIndicator
            error={trackPromises.error}
            isLoading={trackPromises.isLoading}
          />
        </div>

        <Tabs defaultActiveKey={selectedElement.id + '_tab1'}>
          <Tabs.TabPane
            key={selectedElement.id + '_tab1'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Element"
          >
            <FormsGrid>
              {renderUpdateElementContent(selectedElement, trackPromises)}
            </FormsGrid>
          </Tabs.TabPane>

          <Tabs.TabPane
            destroyInactiveTabPane
            key={selectedElement.id + '_tab2'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Props" // needed to update props if we change them in the prop inspector tab
          >
            {/* {selectedElement.atom ? (*/}
            {/*  <UpdateElementPropsForm*/}
            {/*    elementId={selectedElement.id}*/}
            {/*    key={selectedElement.id}*/}
            {/*    trackPromises={trackPromises}*/}
            {/*    typeService={typeService}*/}
            {/*  />*/}
            {/* ) : (*/}
            {/*  `Add an atom to this element to edit its props`*/}
            {/* )}*/}
          </Tabs.TabPane>

          <Tabs.TabPane
            key={selectedElement.id + '_tab3'}
            style={{ overflow: 'visible' }}
            tab="CSS"
          >
            {/* {selectedElement.atom ? (*/}
            {/*  <ElementCssEditor*/}
            {/*    elementId={selectedElement.id}*/}
            {/*    key={selectedElement.id}*/}
            {/*    trackPromises={trackPromises}*/}
            {/*  />*/}
            {/* ) : (*/}
            {/*  `Add an atom to this page element to edit its CSS`*/}
            {/* )}*/}
          </Tabs.TabPane>

          <Tabs.TabPane
            key={selectedElement.id + '_tab4'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Hooks"
          >
            <ElementHookSection
              atomService={atomService}
              elementId={selectedElement.id}
              key={selectedElement.id}
              typeService={typeService}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            key={selectedElement.id + '_tab5'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Props Inspector"
          >
            <PropsInspectorTab
              elementId={selectedElement.id}
              key={selectedElement.id}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            key={selectedElement.id + '_tab6'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Prop mapping"
          >
            <PropMapBindingSection
              elementId={selectedElement.id}
              key={selectedElement.id}
              providePropCompletion={(searchValue) =>
                selectedElement
                  ? providePropCompletion(searchValue, selectedElement.id)
                  : []
              }
              tree={tree}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            key={selectedElement.id + '_tab7'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab="Prop transformation"
          >
            {/* <UpdateElementPropTransformationForm*/}
            {/*  elementId={selectedElement.id}*/}
            {/*  key={selectedElement.id}*/}
            {/*  trackPromises={trackPromises}*/}
            {/*  tree={tree}*/}
            {/*/ >*/}
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    )
  },
)
