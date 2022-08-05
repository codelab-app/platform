import { Button, Card, Typography } from 'antd'
import React from 'react'

const { Meta } = Card
const { Text } = Typography

const App = () => (
  <Card
    extra={<a href="#">More</a>}
    hoverable={true}
    style={{ width: 480 }}
    title="Default size card"
  >
    <Text strong>$150.00</Text>
    <Button block type="primary">
      Add To Cart
    </Button>
  </Card>
)

export default App
