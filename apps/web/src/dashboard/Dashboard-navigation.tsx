import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'
import { WithRouterProps } from 'next/dist/client/with-router'
import Link from 'next/link'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { useRecoilState } from 'recoil'
import { CreatePageModal } from '../pages/createPage/CreatePageModal'
import { pageFormState } from '../pages/createPage/pageFormState'
import { DashboardTree } from './Dashboard-tree'
import { Page, withRouterLoader } from '@codelab/frontend'
import {
  GetPagesGql,
  useDeletePageMutation,
  useGetPagesQuery,
} from '@codelab/generated'

export const DashboardNavigationInner = ({ router }: WithRouterProps) => {
  const appId = `${router.query.appId}`

  const [pageForm, setPageForm] = useRecoilState(pageFormState)

  const { data } = useGetPagesQuery({
    variables: {
      input: {
        appId,
      },
    },
  })

  const [deletePage] = useDeletePageMutation({
    refetchQueries: [
      {
        query: GetPagesGql,
        variables: {
          input: {
            appId,
          },
        },
      },
    ],
  })

  const treeData = {}

  return (
    <>
      <Button
        size="small"
        icon={<PlusOutlined />}
        onClick={() => setPageForm({ visible: true })}
      >
        Add
      </Button>
      {data?.getPages.map((page) => (
        <div key={`${page.id}`}>
          <Link
            href={{
              pathname: Page.PAGE_DETAIL.url,
              query: { appId: router.query.appId, pageId: page.id },
            }}
          >
            <a>{page.title}</a>
          </Link>
          <DeleteTwoTone
            onClick={() =>
              deletePage({ variables: { input: { pageId: page.id } } })
            }
          />
        </div>
      ))}
      <CreatePageModal />
      <Divider />
      <DashboardTree data={[treeData]} />
    </>
  )
}

export const DashboardNavigation: any = R.compose(
  withRouter,
  withRouterLoader('appId'),
)(DashboardNavigationInner)
