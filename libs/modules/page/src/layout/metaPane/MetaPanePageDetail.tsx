import { refetchGetPageQuery } from '@codelab/codegen/graphql'
import {
  DeleteElementButton,
  DeleteElementModal,
  ElementCssEditor,
} from '@codelab/modules/element'
import { UpdateElementPropsForm } from '@codelab/modules/prop'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React, { useContext } from 'react'
import tw from 'twin.macro'
import { usePageBuilderState } from '../../builder'
import { MovePageElementForm } from '../../pageElement/movePageElement'
import { UpdatePageElementForm } from '../../pageElement/updatePageElement'
import { PageContext } from '../../providers'

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
  .tab-panel {
    ${tw`overflow-auto`}
  }
`

export const MetaPanePageDetail = () => {
  const {
    state: { selectedPageElement },
    reset,
  } = usePageBuilderState()

  const { pageId } = useContext(PageContext)

  if (!pageId) {
    throw new Error('PageContext is needed for MetaPanePageDetail')
  }

  if (!selectedPageElement) {
    return null
  }

  // Transform it, because we have the node in the state
  const pageElement = {
    id: selectedPageElement.id,
    atom: selectedPageElement.atom,
    name: selectedPageElement.name,
    props: selectedPageElement.props,
  }

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
        <Tabs defaultActiveKey={pageElement.id + '_tab1'}>
          <Tabs.TabPane tab="Page element" key={pageElement.id + '_tab1'}>
            <FormsGrid>
              <UpdatePageElementForm
                key={pageElement.id + '_update_form'}
                initialData={pageElement}
              />

              <MovePageElementForm
                key={pageElement.id + '_move_form'}
                elementId={pageElement.id}
              />

              <div>
                <DeleteElementButton
                  danger={true}
                  elementId={selectedPageElement.id}
                  metadata={pageElement}
                />
              </div>
            </FormsGrid>

            <DeleteElementModal
              formProps={{
                onSubmitSuccess: () => reset(),
                refetchQueries: [refetchGetPageQuery({ input: { pageId } })],
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Props" key={pageElement.id + '_tab2'}>
            {pageElement.atom ? (
              <UpdateElementPropsForm
                key={pageElement.id}
                elementId={pageElement.id}
                atom={pageElement.atom}
              />
            ) : (
              'Add an atom to this page element to edit its props'
            )}
          </Tabs.TabPane>
          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="CSS"
            key={pageElement.id + '_tab3'}
          >
            {pageElement.atom ? (
              <ElementCssEditor
                key={pageElement.id}
                element={selectedPageElement}
              />
            ) : (
              'Add an atom to this page element to edit its CSS'
            )}
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    </Resizable>
  )
}
