import { Col, Row } from 'antd'
import React from 'react'
import tw from 'twin.macro'

interface HeaderProps {
  centralArea?: React.ReactElement | null
  direction?: React.ReactElement | null
  logo?: React.ReactElement | null
  toolbar?: React.ReactElement | null
}

export const Header = ({
  centralArea,
  direction,
  logo,
  toolbar,
}: HeaderProps) => {
  return (
    <div>
      <div
        css={tw`
            bg-white
            relative
            h-10
            w-full
            border-solid
            border-t-0
            border-l-0
            border-r-0
            border-b-2
            border-gray-300
            flex
            flex-row
            overflow-hidden
        `}
      >
        <div css={tw`w-10 h-full flex-shrink-0 overflow-clip cursor-pointer`}>
          {logo}
        </div>
        <div
          css={tw`
            flex-1
            relative
            h-full
            p-1
        `}
        >
          <Row css={tw`h-full`} justify="space-between">
            <Col css={tw`h-full`} span={4}>
              {direction}
            </Col>
            <Col css={tw`h-full`} span={8}>
              {centralArea}
            </Col>
            <Col css={tw`h-full`} span={4}>
              {toolbar}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
