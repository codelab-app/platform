import { Space } from 'antd'
import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { LayoutPaneVisibility } from '../../layout/layout-state'
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
    <div style={{ margin: '1rem' }}>
      <Space
        align="end"
        direction="horizontal"
        style={{
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <DeletePageButton onSuccess={onSuccess} />
        <UpdatePageButton submitRef={submitRef} />
      </Space>
      <UpdatePageForm
        pageId={detailPageId}
        submitRef={submitRef}
        onSubmitSuccess={onSuccess}
      />
    </div>
  )
}
