import { Fancybox } from '@codelab/frontend-presentation-components-fancybox'
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, useSpring } from '@react-spring/web'
import { Button, Col, Row, Space } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { BuilderDemo } from '../demo/BuilderDemo'
import { CurveAccent } from './CurveAccent'

const words = ['Ant Design', 'Material UI', 'Semantic UI', 'HTML tags']
// https://github.com/pmndrs/react-spring/issues/1515
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatedDiv = styled(animated.div)<any>``

export const BannerSection = () => {
  const [index, setIndex] = useState(0)

  const props = useSpring({
    config: { duration: 3000 },
    from: { opacity: 0 },
    // loop: true,
    onRest: () => {
      setIndex((index + 1) % words.length)
    },
    to: { opacity: 1 },
  })

  return (
    <>
      <section className="m-auto w-full md:container">
        <div className="m-auto mt-0 w-11/12 py-6 md:container md:mt-12 md:py-10">
          <Row className="justify-center">
            <Col className="flex flex-col items-center">
              <h1 className="mb-0 text-center text-xl font-bold leading-snug sm:text-3xl md:text-4xl lg:text-5xl xl:!text-6xl">
                Build Using&nbsp;
                <span className="inline-block text-yellow-400">
                  <AnimatedDiv style={props}>{words[index]}</AnimatedDiv>
                </span>
                <br />
                <p className="mb-1 mt-0 md:mt-3">
                  Without Template Limitations
                </p>
              </h1>
              <p className="mb-3 mt-0 w-full px-2 text-center text-sm font-light leading-5 sm:px-12 sm:py-4  sm:text-base sm:leading-7 md:mt-4 md:text-lg lg:px-0 lg:text-xl xl:w-3/4 xl:text-2xl">
                <span className="mb-0 md:mb-10">
                  Nest components to construct the DOM tree as you would in
                  code.&nbsp;
                </span>
                <br className="hidden md:block" />
                <span className="mb-1 hidden md:block"></span>
                <span className="mt-0">
                  Configure props provided by UI frameworks so you can save
                  time.
                </span>
              </p>
              <Space
                align="center"
                className="mb-6 w-full justify-center md:mb-0"
                size="large"
              >
                <Fancybox
                  options={{
                    closeButton: 'outside',
                    infinite: false,
                  }}
                >
                  <Button
                    className="h-10 w-36 rounded-lg text-sm sm:h-12 sm:w-48 sm:text-lg md:h-14"
                    data-fancybox="gallery"
                    data-src="https://www.youtube.com/watch?v=OrmhGmr0iTA"
                    icon={
                      <FontAwesomeIcon
                        className="mr-2 text-sm sm:text-lg md:text-xl"
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
                  className="h-10 w-36 rounded-lg text-sm sm:h-12 sm:w-48 sm:text-lg md:h-14"
                  ghost
                  icon={
                    <FontAwesomeIcon
                      className="mr-2 text-sm sm:text-lg md:text-xl"
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
        <div className="m-auto w-9/12 md:container md:w-11/12">
          <BuilderDemo />
        </div>
      </section>
      <CurveAccent />
    </>
  )
}
