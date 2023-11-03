import {
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { demoCardPropState } from './ButtonDemoProps'

const { Text } = Typography

export const DemoShoppingCard = () => {
  const demoCardProp = useRecoilValue(demoCardPropState)

  const cardIcon = (icon: string) => {
    if (icon === 'shopping-outlined') {
      return <ShoppingOutlined />
    }

    if (icon === 'shopping-cart-outlined') {
      return <ShoppingCartOutlined />
    }

    if (icon === 'shop-outlined') {
      return <ShopOutlined />
    }

    return null
  }

  return (
    <Card
      className="m-auto"
      cover={
        <img
          alt="apple-macboook-pro"
          className="m-auto w-44 sm:w-11/12 lg:w-full xl:m-auto xl:w-64 2xl:w-full"
          src="https://www.apple.com/v/macbook-pro/af/images/overview/hero_13__d1tfa5zby7e6_large_2x.jpg"
        />
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text strong>MacBook Pro 13”</Text>
        <Text strong>$150.00</Text>
      </div>
      <p className="mt-3 text-xs text-current sm:text-sm">
        The new M2 chip makes the 13‑inch MacBook Pro more capable than ever.
      </p>
      <Button
        block={demoCardProp.block}
        icon={cardIcon(demoCardProp.icon)}
        type={demoCardProp.type}
      >
        ADD TO CART
      </Button>
    </Card>
  )
}
