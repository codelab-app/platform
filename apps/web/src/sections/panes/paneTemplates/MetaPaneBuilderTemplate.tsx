import { useBuilder } from '@codelab/frontend/modules/builder'
import {
  __AtomFragment,
  ElementFragment,
} from '@codelab/shared/codegen/graphql'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
import tw from 'twin.macro'

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
  .tab-panel,
  .ant-tabs-content {
    overflow: auto;
  }
`

export interface MetaPaneBuilderProps {
  renderUpdateElementContent: (element: ElementFragment) => React.ReactNode
  renderUpdatePropsContent: (
    element: Omit<ElementFragment, 'atom'> & { atom: __AtomFragment },
  ) => React.ReactNode
  renderUpdateCssContent: (
    element: Omit<ElementFragment, 'atom'> & { atom: __AtomFragment },
  ) => React.ReactNode
}

export const MetaPaneBuilderTemplate = ({
  renderUpdateElementContent,
  renderUpdateCssContent,
  renderUpdatePropsContent,
}: MetaPaneBuilderProps) => {
  const {
    state: { selectedElement },
  } = useBuilder()

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
          <Tabs.TabPane tab="Element" key={selectedElement.id + '_tab1'}>
            <FormsGrid>{renderUpdateElementContent(selectedElement)}</FormsGrid>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Props" key={selectedElement.id + '_tab2'}>
            {selectedElement.atom
              ? renderUpdatePropsContent(selectedElement as any)
              : 'Add an atom to this element to edit its props'}
          </Tabs.TabPane>
          <Tabs.TabPane
            style={{ overflow: 'visible' }}
            tab="CSS"
            key={selectedElement.id + '_tab3'}
          >
            {selectedElement.atom
              ? renderUpdateCssContent(selectedElement as any)
              : 'Add an atom to this page element to edit its CSS'}
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    </Resizable>
  )
}
