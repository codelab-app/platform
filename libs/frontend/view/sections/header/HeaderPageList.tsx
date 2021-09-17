import { FileOutlined } from '@ant-design/icons'
import { HeaderProps } from '@codelab/frontend/abstract/props'
import { PageType } from '@codelab/frontend/model/state/router'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

const { SubMenu } = Menu

export const HeaderPageList = (props: HeaderProps) => {
  const { app } = props
  const router = useRouter()
  const { pageId } = router.query
  const currentPage = app?.pages.find((x) => x.id === pageId)

  return (
    <SubMenu key="sub1" icon={<FileOutlined />} title={currentPage?.name}>
      {app?.pages.map((page) => (
        <Menu.Item key={page.id}>
          <Link
            href={{
              pathname: PageType.PageBuilder,
              query: { appId: app.id, pageId: page.id },
            }}
          >
            <a>{page.name}</a>
          </Link>
        </Menu.Item>
      ))}
    </SubMenu>
  )
}
