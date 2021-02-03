import { FileOutlined, RightOutlined, SettingOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import Link from 'next/link'
import React from 'react'
import { usePage } from '../usePage'
import { Page, PropsWithIds } from '@codelab/frontend'
import { PageFragmentsFragment } from '@codelab/generated'

type GetPagesListProps = {
  pages: Array<PageFragmentsFragment>
} & PropsWithIds<'appId'>

export const GetPagesList = ({ pages, appId }: GetPagesListProps) => {
  const pageHook = usePage()

  return (
    <>
      <List
        size="small"
        dataSource={pages}
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
            {pageHook.pageId === page.id ? (
              // Currently opening page specific detail panel
              <RightOutlined onClick={() => pageHook.resetPage()} />
            ) : (
              <SettingOutlined onClick={() => pageHook.updatePage(page.id)} />
            )}
          </List.Item>
        )}
      />
    </>
  )
}
