import { css } from '@emotion/react'
import { Col, Row, Tabs } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { ButtonPropsForm } from './ButtonDemoProps'
import { DemoShoppingCard } from './DemoShoppingCard'
import { DOMTree } from './DOMTree'
import { DOMTreeCode } from './DOMTreeCode'

const { TabPane } = Tabs

const onChange = (key: string) => {
  console.log(key)
}

export const BuilderDemo = () => {
  return (
    <Row css={tw`w-full md:container flex flex-col-reverse xl:flex-row`}>
      <Col
        css={tw`z-20 mt-20 px-0 md:px-12 lg:px-0 sm:mt-40 lg:mt-60 xl:mt-0 md:z-0 `}
        md={24}
        span={24}
        xl={16}
      >
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane key="1" tab="Builder View">
            {/* <BuilderView /> */}
            <Row>
              <Col
                css={tw`border-2 border-solid border-black mr-0 md:mr-10 mb-6 lg:mb-0`}
                lg={8}
                span={24}
                xl={6}
              >
                <p
                  css={tw`border-0 border-b-2 mb-0 py-2 px-4 border-solid border-black `}
                >
                  DOM Tree
                </p>
                <DOMTree />
              </Col>
              <Col
                css={tw`border-2 border-solid border-black`}
                lg={14}
                span={24}
                xl={11}
              >
                <p
                  css={tw`border-0 border-b-2 mb-0 py-2 px-4 border-solid border-black`}
                >
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
          </TabPane>
          <TabPane key="2" tab="Code Equivalent">
            <DOMTreeCode />
          </TabPane>
        </Tabs>
      </Col>
      <Col md={24} span={24} xl={8}>
        <div
          css={tw`flex justify-center md:justify-center xl:justify-end md:h-full`}
        >
          <div
            css={tw`relative w-full sm:w-full m-0 lg:m-auto lg:m-0 xl:m-0 md:w-3/5 xl:w-full`}
          >
            <img
              css={tw`absolute w-full max-h-80 object-contain sm:max-h-[520px] md:max-h-fit z-10 border border-gray-200 border-solid rounded-xl`}
              src="/Browser/Safari (Big Sur) - Light.png"
            />
            <div
              css={[
                tw`relative z-20`,
                css`
                  top: 21%;
                  width: 90%;
                  margin: 0 auto;
                `,
              ]}
            >
              <DemoShoppingCard />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}
