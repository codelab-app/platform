import { Button, Card, Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'

const { Meta } = Card
const { Text } = Typography

const App = () => (
  <Card
    cover={
      <img src="https://www.apple.com/v/macbook-pro/af/images/overview/hero_13__d1tfa5zby7e6_large_2x.jpg" />
    }
    style={{ width: 320 }}
  >
    <div css={tw`flex justify-between`}>
      <Text strong>MacBook Pro 13”</Text>
      <Text strong>$150.00</Text>
    </div>
    <p css={tw`text-xs text-gray-500 mt-2`}>
      The new M2 chip makes the 13‑inch MacBook Pro more capable than ever.
    </p>
    <Button block type="primary">
      ADD TO CART
    </Button>
  </Card>
)

export default App
