import { Button, Space } from 'antd'
import React, { useRef } from 'react'
import { SubmitController } from '../../../../../libs/frontend/src/components/form/json-schema/Form-jsonSchema--ref'
import { useLayout } from '../../builder/useLayout'
import { CreatePageForm } from './createPage/CreatePageForm'
import { PropsWithIds } from '@codelab/frontend'
import { LayoutPane } from '@codelab/generated'

export const PageContainerCreate = ({ appId }: PropsWithIds<'appId'>) => {
  const submitRef = useRef<SubmitController | undefined>()
  const { setLayout } = useLayout()

  return (
    <div style={{ margin: '1rem' }}>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Button
          onClick={() =>
            setLayout({ variables: { input: { pane: LayoutPane.Main } } })
          }
        >
          Close
        </Button>
        <Button type="primary" onClick={() => submitRef.current?.submit()}>
          Add
        </Button>
      </Space>
      <CreatePageForm
        appId={appId}
        submitRef={submitRef}
        onSubmitSuccess={() =>
          setLayout({ variables: { input: { pane: LayoutPane.Main } } })
        }
      />
    </div>
  )
}
