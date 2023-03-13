import { Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'

const { Link, Text, Title } = Typography

export const Concept = () => {
  return (
    <div>
      <Title css={tw`text-center !font-extrabold`} level={2}>
        Control Your Data Pipeline
      </Title>
      Concept
    </div>
  )
}
