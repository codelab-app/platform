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
    <Row>
      <Col md={16} span={24}>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane key="1" tab="Builder View">
            {/* <BuilderView /> */}
            <Row>
              <Col span={8}>
                <DOMTree />
              </Col>
              <Col span={8}>
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
      <Col md={8} span={24}>
        <div css={tw`flex justify-end`}>
          <div css={tw`relative w-full`}>
            <img
              css={tw`absolute w-full z-10 border border-gray-200 border-solid rounded-xl`}
              src="/Browser/Safari (Big Sur) - Light.png"
            />
            <div
              css={[
                tw`absolute z-20`,
                css`
                  top: 75px;
                  left: 40px;
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
