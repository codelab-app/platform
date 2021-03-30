import { FileOutlined, RightOutlined, SettingOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import { usePage } from '../usePage'
import { AppContext, Page } from '@codelab/frontend/shared'
import { useGetPagesListQuery } from '@codelab/hasura'

export const GetPagesList = () => {
  const { appId } = useContext(AppContext)
  const { detailPageId, togglePageDetailPane } = usePage()

  const { data } = useGetPagesListQuery({
    variables: {
      appId,
    },
  })

  return (
    <>
      <List
        size="small"
        dataSource={data?.app_by_pk?.pages}
        renderItem={(page) => (
          <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
            <Space style={{ width: '100%' }}>
              <FileOutlined />
              <Link
                href={{
                  pathname: Page.PAGE_DETAIL.url,
                  query: { appId, pageId: page.id },
                }}
              >
                <a>{page.name}</a>
              </Link>
            </Space>
            {detailPageId === page.id ? (
              // Clicking on icon for currently opened page
              <RightOutlined onClick={() => togglePageDetailPane(page.id)} />
            ) : (
              <SettingOutlined onClick={() => togglePageDetailPane(page.id)} />
            )}
          </List.Item>
        )}
      />
    </>
  )
}
