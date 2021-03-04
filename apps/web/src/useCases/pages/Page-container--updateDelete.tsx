import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { PaneDetailTemplate } from '../../templates/Pane-detail--template'
import { LayoutPaneVisibility } from '../../templates/layout-state'
import { DeletePageButton } from './deletePage/DeletePageButton'
import { UpdatePageButton } from './updatePage/UpdatePageButton'
import { UpdatePageForm } from './updatePage/UpdatePageForm'
import { pageState, usePage } from './usePage'
import { SubmitController } from 'libs/frontend/src/components/form/json-schema/Form-jsonSchema--ref'

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
          <UpdatePageButton submitRef={submitRef} />
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
