import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { WithRouterProps } from 'next/dist/client/with-router'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useGetPagesQuery } from '../../../../libs/modules/page/src/core/application/useCases/getPages/GetPages.generated'
import { CreatePageModal } from '../pages/createPage/CreatePageModal'
import { pageFormState } from '../pages/createPage/pageFormState'
import { withRouterLoader } from '@codelab/frontend'

export const DashboardNavigationInner = ({ router }: WithRouterProps) => {
  const appId = `${router.query}`

  const [pageForm, setPageForm] = useRecoilState(pageFormState)

  console.log(pageForm)

  const { data } = useGetPagesQuery({
    variables: {
      input: {
        appId,
      },
    },
  })

  return (
    <>
      <Button
        size="small"
        icon={<PlusOutlined />}
        onClick={() => setPageForm({ visible: true })}
      >
        Add
      </Button>
      <CreatePageModal />
    </>
  )
}

export const DashboardNavigation: any = R.compose(
  withRouter,
  withRouterLoader('appId'),
)(DashboardNavigationInner)
