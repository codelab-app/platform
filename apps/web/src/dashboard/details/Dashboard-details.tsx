import { Space } from 'antd'
import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { SubmitController } from '../../../../../libs/frontend/src/components/form/json-schema/JsonSchemaForm-ref'
import { CreatePageForm } from '../../pages/createPage/CreatePageForm'
import { DeletePageButton } from '../../pages/deletePage/DeletePageButton'
import { UpdatePageButton } from '../../pages/updatePage/UpdatePageButton'
import { UpdatePageForm } from '../../pages/updatePage/UpdatePageForm'
import { dashboardDetailsState } from './Dashboard-details--state'
import { PropsWithIds } from '@codelab/frontend'

export const DashboardDetails = ({
  pageId,
  appId,
}: PropsWithIds<'pageId' | 'appId'>) => {
  const [{ action }, setDashboardSettings] = useRecoilState(
    dashboardDetailsState,
  )

  const submitRef = useRef<SubmitController | undefined>()

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
            onSuccess={() =>
              setDashboardSettings({ pageId: undefined, action: undefined })
            }
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
        <CreatePageForm appId={appId} />
      </div>
    )
  }

  return null
}
