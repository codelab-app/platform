import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const DOMTreeCode = () => {
  const codeString = `
  <Card
    cover={
      <img src="https://www.apple.com/v/macbook-pro/af/images/overview/hero_13__d1tfa5zby7e6_large_2x.jpg" />
    }
    style={{ width: 320 }}
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
    <Button block type="primary">
      ADD TO CART
    </Button>
  </Card>
  `

  return (
    <SyntaxHighlighter language="javascript" style={materialDark}>
      {codeString}
    </SyntaxHighlighter>
  )
}
