import { css } from '@emotion/react'
import { faQuoteLeft, faStar } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card, Divider, Typography } from 'antd'
import React from 'react'
import type { Settings } from 'react-slick'
import Slider from 'react-slick'
import tw from 'twin.macro'
import v from 'voca'
import styles from './customDots.module.css'

const { Meta } = Card
const { Text } = Typography

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
      <Card css={[tw`max-w-[600px] mx-2 bg-transparent p-2 sm:p-4 rounded-lg`]}>
        <div css={tw`flex justify-center`}>
          <span css={tw`flex relative -mt-20 bg-slate-700 p-4`}>
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
        {Array(5)
          .fill(
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
          )
          .map((item, idx) => (
            <React.Fragment key={idx}>{item}</React.Fragment>
          ))}
        <div
          css={tw`mt-3 min-h-[120px] md:min-h-[200px] lg:min-h-[144px] xl:min-h-[170px] 2xl:min-h-[140px]`}
        >
          <Text
            css={tw` text-sm sm:text-base text-slate-300`}
            italic
          >{`"${review}"`}</Text>
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

const testimonialItems = [
  {
    review:
      "We tried Wix and some other platforms but couldn't create what we wanted. With this platform, we were able to build some complex user interface without any restrictions for Online Travel Agency (OTA).",
    role: 'Co-Founder @ Mrhost',
    stakeholder: 'Wesley Ko',
  },
  {
    review:
      'We have created our custom backend API for our E-Commerce wholesale integration business, but our frontend was lacking from the constantly changing requirements. Our single frontend developer was much more productive using this no-code platform.',
    role: 'Founder @ Glosku',
    stakeholder: 'Kevin Zhao',
  },
  {
    review:
      "We were able to build our own in-house mini app to help automate some of our PPC marketing flow. Lots of time were saved using these internal tools, and we couldn't do this with traditional website builders.",
    role: 'CEO @ KonvertLab',
    stakeholder: 'Shelby Lewis',
  },
  {
    review:
      "We were able to build our own in-house mini app to help automate some of our PPC marketing flow. Lots of time were saved using these internal tools, and we couldn't do this with traditional website builders.",
    role: 'CEO @ KonvertLab',
    stakeholder: 'Shelby Lewis',
  },
]

export const TestimonialSection = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <>
        <div className={`${styles['slick-dots']} ${styles['slick-thumb']}`}>
          {dots}
        </div>
      </>
    ),
    // dotsClass: 'slick-dots slick-thumb',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div css={tw`px-8 pt-12 pb-12 sm:pb-20 `}>
      <h1
        css={tw`text-center mt-4 sm:mt-14 md:mt-28 !font-extrabold !text-white text-xl sm:text-3xl lg:text-4xl xl:!text-5xl`}
        // level={2}
      >
        Loved by startups
      </h1>
      <Slider {...settings} css={tw`my-2 sm:my-8 pb-0 sm:pb-8 z-10 mt-8`}>
        {testimonialItems.map((item, index) => (
          <TestimonialItem
            key={index}
            review={item.review}
            role={item.role}
            stakeholder={item.stakeholder}
          />
        ))}
      </Slider>
      <div css={tw`mt-12`}></div>
    </div>
  )
}
