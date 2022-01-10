import { css } from '@emotion/react'
import { Avatar, Card, Divider, Rate, Typography } from 'antd'
import React from 'react'
import Slider, { Settings } from 'react-slick'
import tw from 'twin.macro'
import v from 'voca'

const { Meta } = Card
const { Text, Link, Title } = Typography

interface TestimonialItemProps {
  review: string
  stakeholder: string
  role: string
}

export const TestimonialItem = ({
  review,
  stakeholder,
  role,
}: TestimonialItemProps) => {
  const initials = (words: string) =>
    v(words)
      .words()
      .reduce((acc, curr) => `${acc}${v.first(curr)}`, '')

  return (
    <Card
      css={[
        css`
          max-width: 400px;
        `,
        tw`mx-2`,
      ]}
    >
      <Rate
        disabled
        value={5}
        css={[
          css`
            div:hover {
              transform: none;
            }
          `,
          tw`mb-2`,
        ]}
      />
      <div
        css={css`
          min-height: 150px;
        `}
      >
        <Text italic css={tw`text-base`}>{`"${review}"`}</Text>
      </div>
      <Divider />
      <Meta
        css={css`
          .ant-card-meta-title {
            margin-bottom: 0 !important;
          }
        `}
        avatar={<Avatar size={48}>{initials(stakeholder)}</Avatar>}
        title={stakeholder}
        description={role}
      />
    </Card>
  )
}

export const TestimonialSection = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  return (
    <div css={tw`px-8 pt-12 pb-20 bg-gray-200`}>
      <Title css={tw`text-center !font-extrabold`} level={2}>
        Loved by startups
      </Title>
      <Slider {...settings} css={tw`my-8`}>
        <TestimonialItem
          stakeholder="Wesley Ko"
          role="Co-Founder @ Mrhost"
          review="We tried Wix and some other platforms but couldn't create what we wanted. With this platform, we were able to build some complex user interface without any restrictions for Online Travel Agency (OTA)."
        />
        <TestimonialItem
          stakeholder="Kevin Zhao"
          role="Founder @ Glosku"
          review="We have created our custom backend API for our E-Commerce wholesale integration business, but our frontend was lacking from the constantly changing requirements. Our single frontend developer was much more productive using this no-code platform."
        />
        <TestimonialItem
          stakeholder="Shelby Lewis"
          role="CEO @ KonvertLab"
          review="We were able to build our own in-house mini app to help automate some of our PPC marketing flow. Lots of time were saved using these internal tools, and we couldn't do this with traditional website builders."
        />
      </Slider>
    </div>
  )
}
