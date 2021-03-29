import { LeftOutlined } from '@ant-design/icons'
import { Button, PageHeader } from 'antd'
import React, { useRef } from 'react'
import { CreateStyleForm } from './createStyle/CreateStyleForm'
import { useStylesPane } from './useStylesPane'
import { LayoutPaneVisibility } from '@codelab/frontend/layout'
import {
  SubmitController,
  createNotificationHandler,
} from '@codelab/frontend/shared'

export const StyleContainerCreate = () => {
  const submitRef = useRef<SubmitController | undefined>()

  const { resetPane } = useStylesPane()

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <PageHeader
        title="Create Style"
        onBack={() => resetPane(LayoutPaneVisibility.Main)}
        backIcon={<LeftOutlined />}
        extra={[
          <Button
            key={2}
            type="primary"
            onClick={() => submitRef.current?.submit()}
          >
            Create
          </Button>,
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
        <CreateStyleForm
          submitRef={submitRef}
          onSubmitSuccess={() => resetPane(LayoutPaneVisibility.Main)}
          onSubmitError={createNotificationHandler({ type: 'error' })}
        />
      </div>
    </div>
  )
}
