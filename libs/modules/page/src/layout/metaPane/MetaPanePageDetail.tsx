import 'twin.macro'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React, { useContext } from 'react'
import { usePageBuilderState } from '../../builder'
import {
  DeletePageElementButton,
  DeletePageElementModal,
  UpdatePageElementForm,
} from '../../pageElement'
import { MovePageElementForm } from '../../pageElement/movePageElement'

const FormsGrid = ({ children }: React.PropsWithChildren<unknown>) => (
  <div
    tw="grid grid-cols-2 grid-rows-2 gap-4"
    style={{ gridTemplateRows: '1fr auto' }}
  >
    {children}
  </div>
)

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
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tw="px-4 py-2 overflow-y-auto"
          tab="Page element"
          key={selectedPageElement.id}
        >
          <FormsGrid>
            <UpdatePageElementForm pageElement={pageElement} />

            <MovePageElementForm pageElement={pageElement} />

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
      </Tabs>
    </Resizable>
  )
}
