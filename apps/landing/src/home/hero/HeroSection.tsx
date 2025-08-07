'use client'

import { Fancybox } from '@codelab/frontend-presentation-components-fancybox'
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons'
import { Col, Row, Space } from 'antd'

import { CuiButton } from '../../components/CuiButton'
import { CuiText } from '../../components/CuiText'
import { useAuthUrl } from '../auth/use-auth-url'
import { BuilderDemoImage } from '../demo/BuilderDemoImage'
import { CurveAccent } from './CurveAccent'

export const HeroSection = () => {
  const { loginUrl } = useAuthUrl()

  return (
    <>
      <section
        className={`
          m-auto w-full
          md:container
        `}
      >
        <div
          className={`
            m-auto mt-0 w-11/12 py-6
            md:container md:mt-12 md:py-10
          `}
        >
          <Row className="justify-center">
            <Col className="flex flex-col items-center" span={24}>
              <CuiText align="center" variant="hero-title">
                Build Using UI Frameworks
                <br />
                Without Template Limitations
              </CuiText>
              <CuiText
                align="center"
                className={`
                  mb-3 mt-0 w-full px-2 text-center leading-5
                  sm:px-12 sm:py-4
                  md:mt-4
                  lg:px-0
                  xl:w-3/4
                `}
                variant="hero-subtitle"
              >
                Nest components to construct the DOM tree as you would in code.
                <br />
                Configure props provided by UI frameworks so you can save time.
              </CuiText>
              <Space
                align="center"
                className={`
                  mb-6 w-full justify-center
                  md:mb-0
                `}
                size="large"
              >
                <Fancybox
                  options={{
                    closeButton: 'outside',
                    infinite: false,
                  }}
                >
                  <CuiButton
                    data-fancybox="gallery"
                    data-src="https://www.youtube.com/watch?v=OrmhGmr0iTA"
                    icon={faArrowRight}
                    rounded="lg"
                    size="hero"
                    variant="heroPrimary"
                  >
                    Watch Tutorial
                  </CuiButton>
                </Fancybox>
                <CuiButton
                  href={loginUrl}
                  icon={faArrowRight}
                  rounded="lg"
                  size="hero"
                  type="primary"
                  variant="heroPrimary"
                >
                  Login
                </CuiButton>
              </Space>
            </Col>
          </Row>
        </div>
        <Row className="justify-center">
          <Col lg={22} md={22} sm={22} xl={22} xs={22}>
            <BuilderDemoImage />
          </Col>
        </Row>
      </section>
      <CurveAccent />
    </>
  )
}
