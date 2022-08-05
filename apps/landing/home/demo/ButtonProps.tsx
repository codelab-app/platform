import { DownOutlined, UserOutlined } from '@ant-design/icons'
import {
  Button,
  Descriptions,
  Dropdown,
  Menu,
  MenuProps,
  Radio,
  Space,
  Switch,
} from 'antd'

export const ButtonProps = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e)
  }

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e)
  }

  const menu = (
    <Menu
      items={[
        {
          label: '1st menu item',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: '2nd menu item',
          key: '2',
          icon: <UserOutlined />,
        },
        {
          label: '3rd menu item',
          key: '3',
          icon: <UserOutlined />,
        },
      ]}
      onClick={handleMenuClick}
    />
  )

  return (
    <>
      <Descriptions column={1}>
        <Descriptions.Item label="block">
          <Switch defaultChecked onChange={onChange} />
        </Descriptions.Item>
        <Descriptions.Item label="type">
          <Radio.Group defaultValue="a" size="small">
            <Radio.Button value="default">default</Radio.Button>
            <Radio.Button value="primary">primary</Radio.Button>
            <Radio.Button value="ghost">ghost</Radio.Button>
            <Radio.Button value="dashed">dashed</Radio.Button>
            <Radio.Button value="link">link</Radio.Button>
            <Radio.Button value="text">text</Radio.Button>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="type">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              <Space>
                Button
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}
