import { ShoppingOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'
import React from 'react'

const { Meta } = Card
const { Text } = Typography

const App = () => (
  <Card
    cover={<img src="/hero_13__d1tfa5zby7e6_large_2x.jpg" />}
    style={{ width: 320 }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text strong>MacBook Pro 13”</Text>
      <Text strong>$150.00</Text>
    </div>
    <p
      style={{
        color: '#737373',
        fontSize: '12px',
        marginTop: '20px',
      }}
    >
      The new M2 chip makes the 13‑inch MacBook Pro more capable than ever.
    </p>
    <Button block icon={<ShoppingOutlined />} type="primary">
      ADD TO CART
    </Button>
  </Card>
)

export default App
