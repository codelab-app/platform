import { Fancybox } from '@codelab/frontend/view/components'
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row, Space } from 'antd'
import $ from 'jquery'
import React, { useEffect, useRef } from 'react'
import tw from 'twin.macro'
import { BuilderDemo } from '../demo/BuilderDemo'
import { CurveAccent } from './CurveAccent'

// const Fancybox = dynamic<any>(
//   () => import('@codelab/frontend/view/components').then((mod) => mod.Fancybox),
//   { ssr: false },
// )

export const BannerSection = () => {
  const jsRotatingRef = useRef(null)

  useEffect(() => {
    window.jQuery = $
    window.Morphtext = require('node_modules/morphext/dist/morphext.min.js')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <section css={[tw`m-auto md:container w-full`]}>
        <div css={tw`md:container m-auto w-11/12 mt-0 md:mt-12 py-6 md:py-10`}>
          <Row css={tw`justify-center`}>
            <Col css={tw`flex-col flex items-center`}>
              <h1
                css={tw`text-center mb-0 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:!text-6xl leading-snug font-bold`}
              >
                Build Using&nbsp;
                <span css={tw`text-yellow-400 inline-block`}>
                  <span
                    className="animate__animated animate__fadeIn"
                    ref={jsRotatingRef}
                  >
                    Ant Design, Material UI, Semantic UI, HTML tags
                  </span>
                  <br />
                </span>
                <br />
                <p css={tw`md:mt-3 mt-0 mb-1`}>Without Template Limitations</p>
              </h1>
              <p
                css={tw`text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl md:mt-4 mt-0 mb-3 sm:py-4  sm:px-12 lg:px-0 leading-5 sm:leading-7 px-2 font-light xl:w-3/4 w-full`}
              >
                <span css={tw`md:mb-10 mb-0`}>
                  Nest components to construct the DOM tree as you would in
                  code.&nbsp;
                </span>
                <br css={tw`hidden md:block`} />
                <span css={tw`hidden md:block mb-1`}></span>
                <span css={tw`mt-0  `}>
                  Configure props provided by UI frameworks so you can save
                  time.
                </span>
              </p>
              <Space
                align="center"
                css={tw`w-full mb-6 md:mb-0 justify-center`}
                size="large"
              >
                <Fancybox
                  options={{
                    infinite: false,
                    closeButton: 'outside',
                  }}
                >
                  <Button
                    css={tw`h-10 w-36 md:h-14 sm:h-12 sm:w-48 rounded-lg text-sm sm:text-lg`}
                    data-fancybox="gallery"
                    data-src="https://www.youtube.com/watch?v=OrmhGmr0iTA"
                    icon={
                      <FontAwesomeIcon
                        css={tw`text-sm sm:text-lg md:text-xl mr-2`}
                        icon={faArrowRight}
                      />
                    }
                    size="large"
                    type="primary"
                  >
                    Watch Tutorial
                  </Button>
                </Fancybox>
                <Button
                  css={tw`h-10 w-36 md:h-14 sm:h-12 sm:w-48 rounded-lg text-sm sm:text-lg`}
                  ghost
                  icon={
                    <FontAwesomeIcon
                      css={tw`text-sm sm:text-lg md:text-xl mr-2`}
                      icon={faArrowRight}
                    />
                  }
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
        <div css={tw`w-9/12 m-auto md:container md:w-11/12`}>
          <BuilderDemo />
        </div>
      </section>
      <CurveAccent />
    </>
  )
}
