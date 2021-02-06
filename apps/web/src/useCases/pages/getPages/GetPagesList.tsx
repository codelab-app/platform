import { FileOutlined, RightOutlined, SettingOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import { AppContext } from '../../apps/AppProvider'
import { usePage } from '../usePage'
import { Page } from '@codelab/frontend'

export const GetPagesList = () => {
  const { app, appId } = useContext(AppContext)
  const { detailPageId, togglePageDetailPane } = usePage()

  return (
    <>
      <List
        size="small"
        dataSource={app.pages}
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
                <a>{page.title}</a>
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
