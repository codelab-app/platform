import {
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import tw from 'twin.macro'
import { demoCardPropState } from './ButtonDemoProps'

const { Meta } = Card
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
      cover={
        <img src="https://www.apple.com/v/macbook-pro/af/images/overview/hero_13__d1tfa5zby7e6_large_2x.jpg" />
      }
      css={tw` `}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text strong>MacBook Pro 13”</Text>
        <Text strong>$150.00</Text>
      </div>
      <p
        style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#737373',
        }}
      >
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
