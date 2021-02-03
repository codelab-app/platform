import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDetailsState } from '../../dashboard/details/Dashboard-details--state'

export const CreatePageButton = () => {
  const [_, setDashboardDetails] = useRecoilState(dashboardDetailsState)

  return (
    <Button
      size="small"
      icon={<PlusOutlined />}
      onClick={() =>
        setDashboardDetails({ pageId: undefined, action: 'create' })
      }
    >
      Add
    </Button>
  )
}
