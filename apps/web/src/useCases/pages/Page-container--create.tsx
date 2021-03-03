import { Button, Space } from 'antd'
import React, { useContext, useRef } from 'react'
import { SubmitController } from '../../../../../libs/frontend/src/components/form/json-schema/Form-jsonSchema--ref'
import { LayoutPaneVisibility } from '../../templates/layout-state'
import { AppContext } from '../apps/AppProvider'
import { CreatePageForm } from './createPage/CreatePageForm'
import { usePage } from './usePage'

export const PageContainerCreate = () => {
  const { appId } = useContext(AppContext)
  const submitRef = useRef<SubmitController | undefined>()

  const { resetPage } = usePage()

  return (
    <div style={{ margin: '1rem' }}>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={() => resetPage(LayoutPaneVisibility.Main)}>
          Close
        </Button>
        <Button type="primary" onClick={() => submitRef.current?.submit()}>
          Add
        </Button>
      </Space>
      <CreatePageForm
        appId={appId}
        submitRef={submitRef}
        onSubmitSuccess={() => resetPage(LayoutPaneVisibility.Main)}
      />
    </div>
  )
}
