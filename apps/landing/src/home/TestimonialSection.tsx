'use client'

import type { Settings } from 'react-slick'

import { initials } from '@codelab/shared-utils'
import { faQuoteLeft, faStar } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card, Divider, Typography } from 'antd'
import Slider from 'react-slick'

import { CuiText } from '../components/CuiText'
import styles from './customDots.module.css'

const { Meta } = Card
const { Text } = Typography

interface TestimonialItemProps {
  review: string
  role: string
  stakeholder: string
}

export const TestimonialItem = ({
  review,
  role,
  stakeholder,
}: TestimonialItemProps) => {
  return (
    <div className="px-2 sm:px-3">
      <div className="h-8" />
      <Card
        className={`
          max-w-[600px] rounded-lg bg-transparent p-2
          sm:p-4
        `}
      >
        <div className="flex justify-center">
          <span className="relative -mt-20 flex p-4">
            <FontAwesomeIcon
              className="h-20 w-20 [&_path]:fill-yellow-400"
              icon={faQuoteLeft}
              style={{ maxWidth: '80px', maxHeight: '80px' }}
            />
          </span>
        </div>
        <div className="flex items-center">
          {Array(5)
            .fill(null)
            .map((_, idx) => (
              <FontAwesomeIcon
                className={`
                  h-5 w-5 pr-1.5
                  [&_path]:fill-yellow-400
                `}
                icon={faStar}
                key={idx}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            ))}
        </div>
        <div
          className={`
            mt-3 min-h-[120px]
            md:min-h-[200px]
            lg:min-h-[144px]
            xl:min-h-[170px]
            2xl:min-h-[140px]
          `}
        >
          <Text
            className={`
              text-sm text-slate-300
              sm:text-base
            `}
            italic
          >{`"${review}"`}</Text>
        </div>
        <Divider className="bg-slate-600" />
        <Meta
          avatar={<Avatar size={48}>{initials(stakeholder)}</Avatar>}
          className={`
            text-slate-300
            [&_.ant-card-meta-description]:text-slate-400
            [&_.ant-card-meta-title]:!mb-0 [&_.ant-card-meta-title]:text-neutral-300
          `}
          description={role}
          title={stakeholder}
        />
      </Card>
    </div>
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
    appendDots: (dots) => (
      <div
        className={`
          ${styles['slick-dots']}
          ${styles['slick-thumb']}
        `}
      >
        {dots}
      </div>
    ),
    centerMode: false,
    centerPadding: '0px',
    dots: true,
    infinite: true,
    // dotsClass: 'slick-dots slick-thumb',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],

    slidesToScroll: 1,

    slidesToShow: 3,

    speed: 500,
  }

  return (
    <div
      className={`
        px-8 py-12
        sm:pb-20
      `}
    >
      <CuiText
        align="center"
        className={`
          mt-4
          sm:mt-14
          md:mt-28
        `}
        color="white"
        variant="h1"
      >
        Loved by startups
      </CuiText>
      <Slider
        appendDots={settings.appendDots}
        centerMode={settings.centerMode}
        className={`
          z-10 my-2 mt-8 pb-0
          sm:my-8 sm:pb-8
        `}
        dots={settings.dots}
        infinite={settings.infinite}
        responsive={settings.responsive}
        slidesToScroll={settings.slidesToScroll}
        slidesToShow={settings.slidesToShow}
        speed={settings.speed}
      >
        {testimonialItems.map((item, index) => (
          <TestimonialItem
            key={index}
            review={item.review}
            role={item.role}
            stakeholder={item.stakeholder}
          />
        ))}
      </Slider>
      <div className="mt-12"></div>
    </div>
  )
}
