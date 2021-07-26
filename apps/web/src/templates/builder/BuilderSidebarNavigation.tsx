import {
  ApartmentOutlined,
  ApiFilled,
  AppstoreOutlined,
  BookOutlined,
  CopyOutlined,
  DeploymentUnitOutlined,
  FunctionOutlined,
  OneToOneOutlined,
  SettingOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { AppContext, PageType } from '@codelab/frontend/shared'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import tw from 'twin.macro'

export const BuilderSidebarNavigation = () => {
  const router = useRouter()
  // const { libraries } = useContext(LibraryContext)
  const { app } = useContext(AppContext)

  return (
    <>
      <Menu
        css={tw`w-full h-full`}
        defaultSelectedKeys={[PageType.LibraryList]}
        selectedKeys={[router.pathname]}
        defaultOpenKeys={[]}
        style={{ width: '40px' }}
        mode="inline"
      >
        <Menu.Item
          key={PageType.AppList}
          icon={<AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />}
        >
          <Link href={PageType.AppList}>Apps</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key={PageType.PageDetail}
          icon={<CopyOutlined data-testid="pages-tab-trigger" title="Pages" />}
        >
          <Link
            href={{
              pathname: PageType.PageList,
              query: {
                appId: app.id,
                // pageId,
              },
            }}
          >
            Pages
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="tree"
          icon={
            <ApartmentOutlined data-testid="tree-tab-trigger" title="Tree" />
          }
        >
          Tree
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key={PageType.LibraryList}
          icon={
            <BookOutlined data-testid="library-tab-trigger" title="Library" />
          }
        >
          <Link
            href={{
              pathname: PageType.LibraryList,
              query: {
                appId: app.id,
              },
            }}
          >
            Library
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={PageType.Prop} icon={<OneToOneOutlined />}>
          <Link
            href={{
              pathname: PageType.Prop,
              query: {
                // libraryId: libraries?.[0]?.id,
              },
            }}
          >
            Props
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="lambda"
          icon={
            <FunctionOutlined
              data-testid="lambda-tab-trigger"
              title="Function"
            />
          }
        >
          Lambda
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={PageType.Tag} icon={<TagOutlined />}>
          <Link
            href={{
              pathname: PageType.Tag,
            }}
          >
            Tags
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key={PageType.AtomTypeList}
          icon={
            <SettingOutlined
              data-testid="atomType-tab-trigger"
              title="AtomType"
            />
          }
        >
          <Link
            href={{
              pathname: PageType.AtomTypeList,
            }}
          >
            AtomType
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key={PageType.AtomList}
          icon={<DeploymentUnitOutlined title="Atoms" />}
        >
          <Link
            href={{
              pathname: PageType.AtomList,
              query: {
                appId: app.id,
              },
            }}
          >
            Atoms
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key={PageType.PropsInterface}
          icon={<ApiFilled title="API" />}
        >
          <Link
            href={{
              pathname: PageType.PropsInterface,
              query: {
                appId: app.id,
              },
            }}
          >
            Atoms
          </Link>
        </Menu.Item>

        <Menu.Divider />
      </Menu>
    </>
  )
}
