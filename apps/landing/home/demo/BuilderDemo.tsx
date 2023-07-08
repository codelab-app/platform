import { Col, Row, Tabs } from 'antd'
import React from 'react'
import { ButtonPropsForm } from './ButtonDemoProps'
import { DemoShoppingCard } from './DemoShoppingCard'
import { DOMTree } from './DomTree'
import { DOMTreeCode } from './DomTreeCode'

const onChange = (key: string) => {
  console.log(key)
}

export const BuilderDemo = () => {
  const tabItems = [
    {
      children: (
        <Row>
          <Col
            className="mb-6 mr-0 border-2 border-solid border-black md:mr-10 lg:mb-0"
            lg={8}
            span={24}
            xl={6}
          >
            <p className="mb-0 border-0 border-b-2 border-solid border-black px-4 py-2">
              DOM Tree
            </p>
            <DOMTree />
          </Col>
          <Col
            className="border-2 border-solid border-black"
            lg={14}
            span={24}
            xl={11}
          >
            <p className="mb-0 border-0 border-b-2 border-solid border-black px-4 py-2">
              Props (Button)
            </p>
            <ButtonPropsForm />
          </Col>
          {/* <Col span={8}> */}
          {/*  <SyntaxHighlighter language="javascript" style={materialDark}> */}
          {/*    backgroundColor: #A855F6 */}
          {/*  </SyntaxHighlighter> */}
          {/* </Col> */}
        </Row>
      ),
      key: '1',
      label: 'Builder View',
    },
    {
      children: <DOMTreeCode />,
      key: '2',
      label: 'Code Equivalent',
    },
  ]

  return (
    <Row className="flex w-full flex-col-reverse md:container xl:flex-row">
      <Col
        className="z-20 mt-20 px-0 sm:mt-40 md:z-0 md:px-12 lg:mt-60 lg:px-0 xl:mt-0"
        md={24}
        span={24}
        xl={16}
      >
        <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}></Tabs>
      </Col>
      <Col md={24} span={24} xl={8}>
        <div className="flex justify-center md:h-full md:justify-center xl:justify-end">
          <div className="relative m-0 w-full sm:w-full md:w-3/5 lg:m-auto xl:m-0 xl:w-full">
            <img
              alt="/Browser/Safari (Big Sur)"
              className="absolute z-10 max-h-80 w-full rounded-xl border border-solid border-gray-200 object-contain sm:max-h-[520px] md:max-h-fit"
              src="/Browser/Safari (Big Sur) - Light.png"
            />
            <div
              className="relative z-20"
              style={{ margin: '0 auto', top: '21%', width: '90%' }}
            >
              <DemoShoppingCard />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}
