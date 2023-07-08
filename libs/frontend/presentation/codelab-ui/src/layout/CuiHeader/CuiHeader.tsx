import { Col, Row } from 'antd'
import React from 'react'

interface CuiHeaderProps {
  centralArea?: React.ReactElement | null
  direction?: React.ReactElement | null
  logo?: React.ReactElement | null
  toolbar?: React.ReactElement | null
}

export const CuiHeader = ({
  centralArea,
  direction,
  logo,
  toolbar,
}: CuiHeaderProps) => {
  return (
    <div>
      <div className="relative flex h-10 w-full flex-row overflow-hidden border-x-0 border-b-2 border-t-0 border-solid border-gray-300 bg-white">
        <div className="h-full w-10 shrink-0 cursor-pointer text-clip">
          {logo}
        </div>
        <div className="relative h-full flex-1 p-1">
          <Row className="h-full" justify="space-between">
            <Col className="h-full" span={4}>
              {direction}
            </Col>
            <Col className="h-full" span={8}>
              {centralArea}
            </Col>
            <Col className="h-full" span={4}>
              {toolbar}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
