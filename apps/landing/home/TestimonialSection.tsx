import { css } from '@emotion/react'
import { faQuoteLeft, faStar } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card, Divider, Typography } from 'antd'
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
    <>
      <div css={tw`h-8`} />
      <Card
        css={[
          css`
            max-width: 600px;
          `,
          tw`mx-2 bg-transparent rounded-lg`,
        ]}
      >
        <div css={tw`flex justify-center`}>
          <span css={tw`flex relative -mt-16 bg-slate-700 p-4`}>
            <FontAwesomeIcon
              color=""
              css={css`
                path {
                  ${tw`fill-yellow-400`}
                }
              `}
              icon={faQuoteLeft}
              size="5x"
            />
          </span>
        </div>
        {Array(5).fill(
          <FontAwesomeIcon
            css={[
              css`
                path {
                  ${tw`fill-yellow-400`}
                }
              `,
              tw`pr-1.5`,
            ]}
            icon={faStar}
            size="lg"
          />,
        )}
        <div
          css={[
            css`
              min-height: 150px;
            `,
            tw`mt-3`,
          ]}
        >
          <Text css={tw`text-base text-slate-300`} italic>{`"${review}"`}</Text>
        </div>
        <Divider css={tw`bg-slate-600`} />
        <Meta
          avatar={<Avatar size={48}>{initials(stakeholder)}</Avatar>}
          css={[
            css`
              .ant-card-meta-title {
                margin-bottom: 0 !important;
              }
              .ant-card-meta-title {
                ${tw`text-neutral-300`}
              }
              .ant-card-meta-description {
                ${tw`text-slate-400`}
              }
            `,
            tw`text-slate-300`,
          ]}
          description={role}
          title={stakeholder}
        />
      </Card>
    </>
  )
}

export const TestimonialSection = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <div css={tw`px-8 pt-12 pb-20 bg-slate-700`}>
      <Title
        css={tw`text-center mt-28 !font-extrabold !text-slate-300 !text-5xl`}
        level={2}
      >
        Loved by startups
      </Title>
      <Slider {...settings} css={tw`my-8 mt-8`}>
        <TestimonialItem
          review="We tried Wix and some other platforms but couldn't create what we wanted. With this platform, we were able to build some complex user interface without any restrictions for Online Travel Agency (OTA)."
          role="Co-Founder @ Mrhost"
          stakeholder="Wesley Ko"
        />
        <TestimonialItem
          review="We have created our custom backend API for our E-Commerce wholesale integration business, but our frontend was lacking from the constantly changing requirements. Our single frontend developer was much more productive using this no-code platform."
          role="Founder @ Glosku"
          stakeholder="Kevin Zhao"
        />
        <TestimonialItem
          review="We were able to build our own in-house mini app to help automate some of our PPC marketing flow. Lots of time were saved using these internal tools, and we couldn't do this with traditional website builders."
          role="CEO @ KonvertLab"
          stakeholder="Shelby Lewis"
        />
        <TestimonialItem
          review="We were able to build our own in-house mini app to help automate some of our PPC marketing flow. Lots of time were saved using these internal tools, and we couldn't do this with traditional website builders."
          role="CEO @ KonvertLab"
          stakeholder="Shelby Lewis"
        />
      </Slider>
    </div>
  )
}
