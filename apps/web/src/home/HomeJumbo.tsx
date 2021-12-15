import 'bower_components/Morphext/dist/morphext.css'
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Fancybox } from '@codelab/frontend/view/components'
import { css } from '@emotion/react'
import { Button, Col, Image, Row, Space, Typography } from 'antd'
import $ from 'jquery'
import React, { useEffect, useRef } from 'react'
import tw from 'twin.macro'

const { Title, Text, Paragraph } = Typography

// const Fancybox = dynamic<any>(
//   () => import('@codelab/frontend/view/components').then((mod) => mod.Fancybox),
//   { ssr: false },
// )

export const HomeJumbo = () => {
  const jsRotatingRef = useRef(null)

  useEffect(() => {
    window.jQuery = $
    window.Morphtext = require('bower_components/Morphext/dist/morphext.min.js')
    ;($(jsRotatingRef.current!) as any).Morphext({
      // The [in] animation type. Refer to Animate.css for a list of available animations.
      animation: 'animate__animated animate__fadeIn',
      // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
      separator: ',',
      // The delay between the changing of each phrase in milliseconds.
      speed: 2200,
      complete: function () {
        // Called after the entrance animation is executed.
      },
    })
  })

  return (
    <Row css={tw`my-8 justify-center`}>
      <Col css={tw`flex-col`} style={{ width: '60rem' }}>
        <Title css={tw`text-center !text-6xl leading-6 !font-extrabold`}>
          Build using&nbsp;
          <span css={tw`bg-red-100 inline-block`} style={{ minWidth: '20rem' }}>
            <span
              ref={jsRotatingRef}
              className="animate__animated animate__fadeIn"
            >
              Ant Design, Material UI, Semantic UI, HTML tags
            </span>
            <br />
          </span>
          <br />
          without template limitations
        </Title>
        <Paragraph css={tw`text-center text-2xl px-16 leading-9 font-light`}>
          Nest components or HTML to construct the DOM tree as you would in
          code. Configure props provided by UI frameworks so you can save time.
        </Paragraph>
        <Space css={tw`w-full justify-center`} align="center" size="large">
          <Fancybox
            options={{
              infinite: false,
              closeButton: 'outside',
            }}
          >
            <p>
              <Button
                size="large"
                icon={<ArrowRightOutlined />}
                data-fancybox="gallery"
                data-src="https://www.youtube.com/watch?v=OrmhGmr0iTA"
                type="primary"
              >
                Watch Tutorial
              </Button>
            </p>
          </Fancybox>
          <Button
            size="large"
            icon={<ArrowRightOutlined />}
            type="primary"
            ghost
          >
            Log In
          </Button>
        </Space>
      </Col>

      <div
        css={[
          css`
            &:hover img {
              transform: scale(0.92);
              transition-duration: 0.6s;
            }
            &:hover .watch-content {
              transform: scale(1.08);
              transition-duration: 0.6s;
            }
            & img,
            & .watch-content {
              transition-duration: 0.6s;
            }
          `,
          tw`hover:cursor-pointer relative`,
        ]}
      >
        <Image src="/banner-screenshot.png" preview={false} css={tw`mt-8 `} />
        <div
          className="watch-content"
          css={[
            tw`absolute bg-white z-10 text-2xl flex justify-center`,
            css`
              width: 640px;
              height: 80px;
              left: calc(50% - 320px);
              top: calc(50% - 40px);
            `,
          ]}
        >
          <PlayCircleOutlined css={tw`w-12 text-3xl mt-6`} />
          <span
            css={[
              tw`flex self-center text-2xl`,
              css`
                line-height: 80px;
              `,
            ]}
          >
            Watch how to build a products page with Shopify.
          </span>
        </div>
      </div>
    </Row>
  )
}
