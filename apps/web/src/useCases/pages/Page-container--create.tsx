import { Button, Space } from 'antd'
import React, { useRef } from 'react'
import { SubmitController } from '../../../../../libs/frontend/src/components/form/json-schema/JsonSchemaForm-ref'
import { useBuilderLayout } from '../../builder/Builder-pane--state'
import { CreatePageForm } from './createPage/CreatePageForm'
import { PropsWithIds } from '@codelab/frontend'

export const PageContainerCreate = ({ appId }: PropsWithIds<'appId'>) => {
  const layout = useBuilderLayout()
  const submitRef = useRef<SubmitController | undefined>()

  return (
    <div style={{ margin: '1rem' }}>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={() => layout.details.toggle()}>Close</Button>
        <Button type="primary" onClick={() => submitRef.current?.submit()}>
          Add
        </Button>
      </Space>
      <CreatePageForm
        appId={appId}
        submitRef={submitRef}
        onSubmitSuccess={() => layout.details.toggle(false)}
      />
    </div>
  )
}
