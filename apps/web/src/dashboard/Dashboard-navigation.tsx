import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { WithRouterProps } from 'next/dist/client/with-router'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { useGetPagesQuery } from '../../../../libs/modules/page/src/core/application/useCases/getPages/GetPages.generated'
import { withRouterLoader } from '@codelab/frontend'

export const DashboardNavigationInner = ({ router }: WithRouterProps) => {
  const appId = `${router.query}`

  const { data } = useGetPagesQuery({
    variables: {
      input: {
        appId,
      },
    },
  })

  console.log(data)

  return (
    <>
      <Button size="small" icon={<PlusOutlined />}>
        Add
      </Button>
    </>
  )
}

export const DashboardNavigation = R.compose(
  withRouter,
  withRouterLoader('appId'),
)(DashboardNavigationInner)
