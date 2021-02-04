import { Space } from 'antd'
import React, { useRef } from 'react'
import { DeletePageButton } from './deletePage/DeletePageButton'
import { UpdatePageButton } from './updatePage/UpdatePageButton'
import { UpdatePageForm } from './updatePage/UpdatePageForm'
import { usePage } from './usePage'
import { PropsWithIds } from '@codelab/frontend'
import { SubmitController } from 'libs/frontend/src/components/form/json-schema/JsonSchemaForm-ref'

export type PageContainerUpdateDeleteProps = PropsWithIds<'pageId' | 'appId'>

export const PageContainerUpdateDelete = ({
  pageId,
  appId,
}: PageContainerUpdateDeleteProps) => {
  const submitRef = useRef<SubmitController | undefined>()
  const pageHook = usePage()
  const onSuccess = () => pageHook.resetPage()

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
        <DeletePageButton pageId={pageId} appId={appId} onSuccess={onSuccess} />
        <UpdatePageButton submitRef={submitRef} />
      </Space>
      <UpdatePageForm
        pageId={pageId}
        submitRef={submitRef}
        onSubmitSuccess={onSuccess}
      />
    </div>
  )
}
