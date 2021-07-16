import { refetchGetPageQuery } from '@codelab/codegen/graphql'
import {
  DeleteElementButton,
  DeleteElementModal,
  ElementCssEditor,
  UpdateElementPropsForm,
} from '@codelab/modules/element'
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
    state: { selectedElement },
    reset,
  } = usePageBuilderState()

  const { pageId } = useContext(PageContext)

  if (!pageId) {
    throw new Error('PageContext is needed for MetaPanePageDetail')
  }

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
        <Tabs defaultActiveKey={selectedElement.id + '_tab1'}>
          <Tabs.TabPane tab="Page element" key={selectedElement.id + '_tab1'}>
            <FormsGrid>
              <UpdatePageElementForm
                key={selectedElement.id + '_update_form'}
                initialData={selectedElement}
              />

              <MovePageElementForm
                key={selectedElement.id + '_move_form'}
                elementId={selectedElement.id}
              />

              <div>
                <DeleteElementButton
                  danger={true}
                  elementId={selectedElement.id}
                  metadata={selectedElement}
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
          <Tabs.TabPane tab="Props" key={selectedElement.id + '_tab2'}>
            <UpdateElementPropsForm element={selectedElement} />
          </Tabs.TabPane>
          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="CSS"
            key={selectedElement.id + '_tab3'}
          >
            {selectedElement.atom ? (
              <ElementCssEditor
                key={selectedElement.id}
                element={selectedElement}
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
