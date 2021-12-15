import { ArrowRightOutlined } from '@ant-design/icons'
import { padding, twoGridCol } from '@codelab/frontend/style'
import { Button, Card, Col, Image, Row, Typography } from 'antd'
import React from 'react'

const { Title } = Typography

export const HomeJumbo = () => {
  const titleStyle = {
    fontSize: '2.75rem',
    lineHeight: 1.5,
  }

  const subtitleStyle = {
    fontSize: '1.2em',
    lineHeight: 1.5,
  }

  return (
    <Row gutter={[padding.sm, padding.sm]} align="middle">
      <Col {...twoGridCol}>
        <Card>
          <Title style={titleStyle}>
            Rapidly Deliver Production Grade User Interface
          </Title>
          <p style={subtitleStyle}>
            The process of choose a tech stack & managing frontend state can be
            a challenging task in the ever-so evolving JavaScript ecosystem.
          </p>
          <p style={subtitleStyle}>
            We have abstracted everything you need to build out a robust
            frontend web application.
          </p>
          <Button size="large" icon={<ArrowRightOutlined />} type="primary">
            Start Building Now
          </Button>
        </Card>
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
