import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { DeletePageButton } from './deletePage/DeletePageButton'
import { UpdatePageForm } from './updatePage/UpdatePageForm'
import { pageState, usePage } from './usePage'
import {
  LayoutPaneVisibility,
  PaneDetailTemplate,
} from '@codelab/frontend/layout'
import { SubmitController, SubmitRefButton } from '@codelab/frontend/shared'

export const PageContainerUpdateDelete = () => {
  const submitRef = useRef<SubmitController | undefined>()
  const pageHook = usePage()
  const onSuccess = () => pageHook.resetPage(LayoutPaneVisibility.Main)
  const [detailPageId] = useRecoilState(pageState)

  return (
    <PaneDetailTemplate
      header={
        <>
          <DeletePageButton onSuccess={onSuccess} />
          <SubmitRefButton submitRef={submitRef} />
        </>
      }
    >
      <UpdatePageForm
        pageId={detailPageId}
        submitRef={submitRef}
        onSubmitSuccess={onSuccess}
      />
    </PaneDetailTemplate>
  )
}
