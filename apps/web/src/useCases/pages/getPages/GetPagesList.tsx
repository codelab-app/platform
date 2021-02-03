import { FileOutlined, RightOutlined, SettingOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { pageDetailsState } from '../pageDetailsState'
import { PropsWithIds } from '@codelab/frontend'
import { PageFragmentsFragment } from '@codelab/generated'

type GetPagesListProps = {
  pages: Array<PageFragmentsFragment>
} & PropsWithIds<'appId'>

export const GetPagesList = ({ pages, appId }: GetPagesListProps) => {
  const [pageDetails, setPageDetails] = useRecoilState(pageDetailsState)

  return (
    <>
      <List
        size="small"
        dataSource={pages}
        renderItem={(page) => (
          <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
            <Space style={{ width: '100%' }}>
              <FileOutlined />
              {page.title}
            </Space>
            {pageDetails.pageId === page.id ? (
              <RightOutlined
                onClick={() =>
                  setPageDetails({
                    action: undefined,
                    pageId: undefined,
                  })
                }
              />
            ) : (
              <SettingOutlined
                onClick={() =>
                  setPageDetails({
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
