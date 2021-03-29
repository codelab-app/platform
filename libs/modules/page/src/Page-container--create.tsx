import { Button } from 'antd'
import React, { useContext, useRef } from 'react'
import { CreatePageForm } from './createPage/CreatePageForm'
import { usePage } from './usePage'
import { AppContext, SubmitController } from '@codelab/frontend/shared'
import {
  LayoutPaneVisibility,
  PaneDetailTemplate,
} from '@codelab/frontend/layout'

export const PageContainerCreate = () => {
  const { appId } = useContext(AppContext)
  const submitRef = useRef<SubmitController | undefined>()
  const { resetPage } = usePage()

  return (
    <PaneDetailTemplate
      header={
        <>
          <Button onClick={() => resetPage(LayoutPaneVisibility.Main)}>
            Close
          </Button>
          <Button type="primary" onClick={() => submitRef.current?.submit()}>
            Add
          </Button>
        </>
      }
    >
      <CreatePageForm
        appId={appId}
        submitRef={submitRef}
        onSubmitSuccess={() => resetPage(LayoutPaneVisibility.Main)}
      />
    </PaneDetailTemplate>
  )
}
