import { FileOutlined, RightOutlined, SettingOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDetailsState } from '../../dashboard/details/Dashboard-details--state'
import { PropsWithIds } from '@codelab/frontend'
import { PageFragmentsFragment } from '@codelab/generated'

type GetPagesListProps = {
  pages: Array<PageFragmentsFragment>
} & PropsWithIds<'appId'>

export const GetPagesList = ({ pages, appId }: GetPagesListProps) => {
  const [dashboardDetails, setDashboardDetails] = useRecoilState(
    dashboardDetailsState,
  )

  return (
    <>
      <List
        size="small"
        dataSource={pages}
        renderItem={(page) => (
          <List.Item onMouseOver={() => null}>
            <Space style={{ width: '100%' }}>
              <FileOutlined />
              {page.title}
            </Space>
            {dashboardDetails.pageId === page.id ? (
              <RightOutlined
                onClick={() =>
                  setDashboardDetails({
                    action: undefined,
                    pageId: undefined,
                  })
                }
              />
            ) : (
              <SettingOutlined
                onClick={() =>
                  setDashboardDetails({
                    action: 'update',
                    pageId: page.id,
                  })
                }
              />
            )}
          </List.Item>
        )}
      />
      {/* {pages.map((page) => (
        <div key={`${page.id}`}>
          <Link
            href={{
              pathname: Page.PAGE_DETAIL.url,
              query: { appId, pageId: page.id },
            }}
          >
            <a>{page.title}</a>
          </Link>

        </div>
      ))} */}
    </>
  )
}
