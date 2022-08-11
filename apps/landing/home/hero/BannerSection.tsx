import { ArrowRightOutlined } from '@ant-design/icons'
import { Fancybox } from '@codelab/frontend/view/components'
import { Button, Col, Row, Space, Typography } from 'antd'
import $ from 'jquery'
import React, { useEffect, useRef } from 'react'
import tw from 'twin.macro'
import { BuilderDemo } from '../demo/BuilderDemo'
import { CurveAccent } from './CurveAccent'

const { Title, Text, Paragraph } = Typography

// const Fancybox = dynamic<any>(
//   () => import('@codelab/frontend/view/components').then((mod) => mod.Fancybox),
//   { ssr: false },
// )

export const BannerSection = () => {
  const jsRotatingRef = useRef(null)

  useEffect(() => {
    window.jQuery = $
    window.Morphtext = require('node_modules/morphext/dist/morphext.min.js')
    ;($(jsRotatingRef.current!) as any).Morphext({
      // The [in] animation type. Refer to Animate.css for a list of available animations.
      animation: 'animate__animated animate__fadeIn',
      // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
      separator: ',',
      // The delay between the changing of each phrase in milliseconds.
      speed: 4200,
      complete: function () {
        // Called after the entrance animation is executed.
      },
    })
  })

  return (
    <>
      <section css={[tw`my-20`]}>
        <div css={tw`container py-10`}>
          <Row css={tw`justify-center`}>
            <Col
              css={tw`flex-col flex items-center`}
              style={{ width: '62rem' }}
            >
              <h1 css={tw`text-center !text-6xl leading-snug font-bold`}>
                Build Using&nbsp;
                <span
                  css={tw`bg-red-100 inline-block`}
                  style={{ minWidth: '20rem' }}
                >
                  <span
                    className="animate__animated animate__fadeIn"
                    ref={jsRotatingRef}
                  >
                    Ant Design, Material UI, Semantic UI, HTML tags
                  </span>
                  <br />
                </span>
                <br />
                Without Template Limitations
              </h1>
              <p
                css={tw`text-center text-lg px-16 py-4 leading-7 font-light w-3/4`}
              >
                Create custom components using HTML or UI framework components.
                Configure behavior using props provided by those libraries.
              </p>
              <Space
                align="center"
                css={tw`w-full justify-center`}
                size="large"
              >
                <Fancybox
                  options={{
                    infinite: false,
                    closeButton: 'outside',
                  }}
                >
                  <Button
                    data-fancybox="gallery"
                    data-src="https://www.youtube.com/watch?v=OrmhGmr0iTA"
                    icon={<ArrowRightOutlined />}
                    size="large"
                    type="primary"
                  >
                    Watch Tutorial
                  </Button>
                </Fancybox>
                <Button
                  ghost
                  icon={<ArrowRightOutlined />}
                  size="large"
                  type="primary"
                >
                  Log In
                </Button>
              </Space>
            </Col>
            {/* <WatchTutorial /> */}
          </Row>
        </div>
        <div css={tw`container`}>
          <BuilderDemo />
        </div>
        <CurveAccent />
      </section>
    </>
  )
}
