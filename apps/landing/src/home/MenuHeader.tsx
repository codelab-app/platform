import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { breakpoints } from '@codelab/shared-config-builder'
import { Button, Menu } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { disableMenuHoverEffects, removeHoverBorder } from '../../styles/style'
import { LoginUserButton } from './auth/LoginUserButton'
import { RegisterUserButton } from './auth/RegisterUserButton'
import { SignOutUserButton } from './auth/SignOutUserButton'

export enum PageType {
  Docs = '/docs',
  Features = '/features',
  Home = '/',
  Pricing = '/pricing',
  Tutorials = '/tutorials',
}

/**
 * We always show `Login` `Register` even if user is login. We simply redirect them to `/apps` page if they're already logged in.
 */
export const HomeMenuHeader = () => {
  const user = false
  const [collapsed, setCollapsed] = useState(true)
  const isMobileOrTablet = useMediaQuery({ maxWidth: breakpoints.Tablet.max })

  const authenticatedUserMenu = (
    <>
      <Menu.Item
        icon={<SignOutUserButton />}
        key="3"
        style={{ order: 6, ...disableMenuHoverEffects }}
      />
      <Menu.SubMenu
        icon={<UserOutlined />}
        key="4"
        popupClassName="h-auto"
        style={{ order: 5 }}
      >
        {/* <Menu.Item>Email {user?.email}</Menu.Item> */}
      </Menu.SubMenu>
    </>
  )

  const guestUserMenu = (
    <>
      <Menu.Item
        css={[removeHoverBorder]}
        icon={<RegisterUserButton />}
        key="3"
        style={{
          order: 6,
          ...disableMenuHoverEffects,
        }}
      />
      <Menu.Item
        css={[removeHoverBorder]}
        icon={<LoginUserButton />}
        key="4"
        style={{
          order: 5,
          ...disableMenuHoverEffects,
        }}
      />
    </>
  )

  return (
    <div style={{ width: collapsed ? 0 : '100%' }}>
      <Button
        onClick={() => {
          setCollapsed(!collapsed)
        }}
        style={{ marginBottom: 16 }}
        type="primary"
      >
        <>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</>
      </Button>
      <Menu
        className="grow justify-end"
        inlineCollapsed={collapsed}
        mode={isMobileOrTablet ? 'inline' : 'horizontal'}
        style={
          isMobileOrTablet
            ? {
                width: '100%',
              }
            : {}
        }
        triggerSubMenuAction="click"
      >
        <Menu.Item key="features">
          <Link href={PageType.Features}>Features</Link>
        </Menu.Item>
        <Menu.Item key="docs">
          <Link href={PageType.Docs}>Docs</Link>
        </Menu.Item>
        <Menu.Item key="pricing">
          <Link href={PageType.Pricing}>Pricing</Link>
        </Menu.Item>
        <Menu.Item key="tutorials">
          <Link href={PageType.Tutorials}>Tutorials</Link>
        </Menu.Item>
        {/* {user ? authenticatedUserMenu : guestUserMenu} */}
        {guestUserMenu}
      </Menu>
      {/* </section> */}
    </div>
  )
}
