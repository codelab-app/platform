import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { CreatePageModal } from '../../pages/createPage/CreatePageModal'
import { pageFormState } from '../../pages/createPage/pageFormState'
import { GetPagesList } from '../../pages/getPages/GetPagesList'
import { PageFragmentsFragment } from '@codelab/generated'

export interface DashboardNavigationProps {
  appId: string
  pages: Array<PageFragmentsFragment>
}

export const DashboardNavigation = ({
  appId,
  pages,
}: DashboardNavigationProps) => {
  const [pageForm, setPageForm] = useRecoilState(pageFormState)

  return (
    <>
      <Button
        size="small"
        icon={<PlusOutlined />}
        onClick={() => setPageForm({ visible: true })}
      >
        Add
      </Button>
      <GetPagesList pages={pages} appId={appId} />
      <CreatePageModal />
    </>
  )
}
