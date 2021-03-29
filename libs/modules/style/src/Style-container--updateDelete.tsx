import { LeftOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'
import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { DeleteStyleButton } from './deleteStyle/DeleteStyleButton'
import { UpdateStyleForm } from './updateStyle/UpdateStyleForm'
import { stylePaneState, useStylesPane } from './useStylesPane'
import {
  createNotificationHandler,
  SubmitController,
  SubmitRefButton,
} from '@codelab/frontend/shared'
import { LayoutPaneVisibility } from '@codelab/frontend/layout'

export const StyleContainerUpdateDelete = () => {
  const submitRef = useRef<SubmitController | undefined>()
  const { resetPane } = useStylesPane()
  const onSuccess = () => resetPane(LayoutPaneVisibility.Main)
  const [{ selectedId }] = useRecoilState(stylePaneState)

  if (!selectedId) {
    return null
  }

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <PageHeader
        title="Update Style"
        onBack={() => resetPane(LayoutPaneVisibility.Main)}
        backIcon={<LeftOutlined />}
        extra={[
          <DeleteStyleButton key={1} onSuccess={onSuccess} />,
          <SubmitRefButton key={2} submitRef={submitRef} />,
        ]}
      />
      <div
        style={{
          overflowY: 'auto',
          padding: '1rem',
          overflowX: 'hidden',
          height: '100%',
        }}
      >
        <UpdateStyleForm
          styleId={selectedId}
          submitRef={submitRef}
          onSubmitSuccess={onSuccess}
          onSubmitError={createNotificationHandler({ type: 'error' })}
        />
      </div>
    </div>
  )
}
