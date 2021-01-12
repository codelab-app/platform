import { AppstoreOutlined, CopyOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { disableSidebarMenuHoverEffects } from '@codelab/frontend'

type AppSidebarProps = {
  // onCollapse: any
}

const { SubMenu } = Menu

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

export const SidebarMenu = (props: AppSidebarProps) => {
  const [openKeys, setOpenKeys] = React.useState(['sub1'])

  const onOpenChange = (keys: Array<React.Key>) => {
    const latestOpenKey = keys.find(
      (key) => openKeys.indexOf(key.toString()) === -1,
    ) as string

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys as Array<string>)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Menu
      mode="inline"
      // theme="dark"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      // style={{ width: 256 }}
    >
      <Menu.Item
        key="1"
        icon={<AppstoreOutlined />}
        style={disableSidebarMenuHoverEffects}
      />
      <Menu.Item
        key="2"
        icon={<CopyOutlined />}
        style={disableSidebarMenuHoverEffects}
      >
        Pages
      </Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
      {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu> */}
    </Menu>
  )
}
