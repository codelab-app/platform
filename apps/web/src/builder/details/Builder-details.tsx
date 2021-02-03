import { Button, Space } from 'antd'
import React, { useRef } from 'react'
import { SubmitController } from '../../../../../libs/frontend/src/components/form/json-schema/JsonSchemaForm-ref'
import { CreatePageForm } from '../../useCases/pages/createPage/CreatePageForm'
import { DeletePageButton } from '../../useCases/pages/deletePage/DeletePageButton'
import { UpdatePageButton } from '../../useCases/pages/updatePage/UpdatePageButton'
import { UpdatePageForm } from '../../useCases/pages/updatePage/UpdatePageForm'
import { useBuilderLayout } from '../builderPanelState'
import { PropsWithIds } from '@codelab/frontend'

type BuilderDetails = PropsWithIds<'appId'>

export const BuilderDetails = ({ appId }: BuilderDetails) => {
  const layout = useBuilderLayout()

  const submitRef = useRef<SubmitController | undefined>()

  const action: any = ''
  const pageId = ''

  if (action === 'update') {
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
          <DeletePageButton
            pageId={pageId}
            appId={appId}
            onSuccess={() => layout.details.toggle()}
          />
          <UpdatePageButton submitRef={submitRef} />
        </Space>
        <UpdatePageForm pageId={pageId} submitRef={submitRef} />
      </div>
    )
  }

  if (action === 'create') {
    return (
      <div style={{ margin: '1rem' }}>
        <Button onClick={() => layout.details.toggle()}>Close</Button>
        <CreatePageForm appId={appId} />
      </div>
    )
  }

  return null
}
