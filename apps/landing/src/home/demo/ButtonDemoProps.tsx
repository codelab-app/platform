import type { ButtonProps } from 'antd'

import ShopOutlined from '@ant-design/icons/ShopOutlined'
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined'
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined'
import { Descriptions, Radio, Select, Space, Switch } from 'antd'
import { atom, useRecoilState } from 'recoil'

interface DemoCardProps {
  block: boolean
  icon: string
  type: ButtonProps['type']
}

export const demoCardPropState = atom<DemoCardProps>({
  default: {
    block: true,
    icon: 'shopping-outlined',
    type: 'primary',
  },
  key: 'DemoCardProp',
})

const { Option } = Select

export const ButtonPropsForm = () => {
  const [demoCardProp, setDemoCardProp] = useRecoilState(demoCardPropState)

  const onBlockToggle = (checked: boolean) => {
    setDemoCardProp({
      ...demoCardProp,
      block: checked,
    })
  }

  return (
    <div className="p-3">
      <Descriptions column={1}>
        <Descriptions.Item label="block">
          <Switch defaultChecked onChange={onBlockToggle} />
        </Descriptions.Item>
        <Descriptions.Item label="type">
          <Radio.Group
            defaultValue="primary"
            onChange={(event) => {
              setDemoCardProp({
                ...demoCardProp,
                type: event.target.value as ButtonProps['type'],
              })
            }}
            size="middle"
          >
            <Radio.Button value="default">default</Radio.Button>
            <Radio.Button value="primary">primary</Radio.Button>
            <Radio.Button value="ghost">ghost</Radio.Button>
            <Radio.Button value="dashed">dashed</Radio.Button>
            <Radio.Button value="link">link</Radio.Button>
            <Radio.Button value="text">text</Radio.Button>
          </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item label="icon">
          <Select
            defaultValue="shopping-outlined"
            onChange={(value, option) => {
              setDemoCardProp({
                ...demoCardProp,
                icon: value,
              })
            }}
            style={{ width: 200 }}
          >
            <Option value="shopping-outlined">
              <Space align="center" direction="horizontal">
                <ShoppingOutlined
                  style={{ display: 'flex', paddingBottom: '2px' }}
                />
                ShoppingOutlined
              </Space>
            </Option>
            <Option value="shopping-cart-outlined">
              <Space
                align="center"
                // css={tw`flex justify-center`}
                direction="horizontal"
              >
                <ShoppingCartOutlined
                  style={{ display: 'flex', paddingBottom: '2px' }}
                />
                ShoppingCartOutlined
              </Space>
            </Option>
            <Option value="shop-outlined">
              <Space
                align="center"
                // css={tw`flex justify-center`}
                direction="horizontal"
              >
                <ShopOutlined
                  style={{ display: 'flex', paddingBottom: '2px' }}
                />
                ShopOutlined
              </Space>
            </Option>
          </Select>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}
