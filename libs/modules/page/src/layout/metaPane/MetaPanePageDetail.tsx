import { UpdatePageElementPropsForm } from '@codelab/modules/prop'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
import tw from 'twin.macro'
import { usePageBuilderState } from '../../builder'
import {
  DeletePageElementButton,
  DeletePageElementModal,
  MovePageElementForm,
  PageElementStyleEditor,
  UpdatePageElementForm,
} from '../../pageElement'

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
                pageElement={pageElement}
              />

              <MovePageElementForm
                key={pageElement.id + '_move_form'}
                pageElement={pageElement}
              />

              <div>
                <DeletePageElementButton
                  danger={true}
                  pageElementId={selectedPageElement.id}
                />
              </div>
            </FormsGrid>

            <DeletePageElementModal
              formProps={{ onSubmitSuccess: () => reset() }}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Props" key={pageElement.id + '_tab2'}>
            {pageElement.atom ? (
              <UpdatePageElementPropsForm
                key={pageElement.id}
                pageElementId={pageElement.id}
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
            <PageElementStyleEditor
              key={pageElement.id}
              pageElement={selectedPageElement}
            />
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    </Resizable>
  )
}
