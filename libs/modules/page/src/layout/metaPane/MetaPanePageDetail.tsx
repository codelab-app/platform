import 'twin.macro'
import { UpdatePageElementPropsForm } from '@codelab/modules/prop'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
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
      <Tabs defaultActiveKey={pageElement.id + '_tab1'}>
        <Tabs.TabPane
          tw="px-4 py-2 overflow-y-auto"
          tab="Page element"
          key={pageElement.id + '_tab1'}
        >
          <FormsGrid>
            <UpdatePageElementForm
              key={pageElement.id}
              pageElement={pageElement}
            />

            <MovePageElementForm
              key={pageElement.id}
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

        <Tabs.TabPane
          tw="px-4 py-2 overflow-y-auto max-h-48"
          tab="Props"
          key={pageElement.id + '_tab2'}
        >
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
      </Tabs>
    </Resizable>
  )
}
