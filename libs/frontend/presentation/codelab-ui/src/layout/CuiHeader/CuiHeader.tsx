import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { Space } from '@codelab/frontend-presentation-components-space'
import { Col, Row } from 'antd'

interface CuiHeaderProps {
  centralArea?: React.ReactElement<unknown> | null
  direction?: React.ReactElement<unknown> | null
  logo?: React.ReactElement<unknown> | null
  toolbar?: React.ReactElement<unknown> | null
  userMenu?: React.ReactElement<unknown> | null
}

export const CuiHeader = ({
  centralArea,
  direction,
  logo,
  toolbar,
  userMenu,
}: CuiHeaderProps) => {
  return (
    <div className={CuiTestId.cuiHeader()}>
      <div
        className={`
          relative flex h-10
          w-full flex-row overflow-hidden
          border-x-0 border-b-2 border-t-0
          border-solid border-gray-300 bg-white
        `}
      >
        <div className="h-full w-10 shrink-0 cursor-pointer text-clip">
          {logo}
        </div>
        <div className="relative h-full flex-1 px-1">
          <Row className="h-full" justify="space-between">
            <Col className="h-full" sm={6} span={12}>
              {direction}
            </Col>
            <Col className="h-full" sm={12} span={0}>
              {centralArea}
            </Col>
            <Col className="h-full" sm={6} span={12}>
              <Space className="flex size-full justify-end">
                {toolbar}
                {userMenu}
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
