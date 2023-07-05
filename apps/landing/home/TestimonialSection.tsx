import { css } from 'styled-components'
import { faQuoteLeft, faStar } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card, Divider, Typography } from 'antd'
import React from 'react'
import type { Settings } from 'react-slick'
import Slider from 'react-slick'
import voca from 'voca'
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
  const initials = (words: string) =>
    voca(words)
      .words()
      .reduce((acc, curr) => `${acc}${voca.first(curr)}`, '')

  return (
    <>
      <div className="h-8" />
      <Card className="max-w-[600px] mx-2 bg-transparent p-2 sm:p-4 rounded-lg">
        <div className="flex justify-center">
          <span className="flex relative -mt-20 bg-slate-700 p-4">
            <FontAwesomeIcon
              color=""
              className="[&_path]:fill-yellow-400"
              icon={faQuoteLeft}
              size="5x"
            />
          </span>
        </div>
        {Array(5)
          .fill(
            <FontAwesomeIcon
              className="[&_path]:fill-yellow-400 pr-1.5"
              icon={faStar}
              size="lg"
            />,
          )
          .map((item, idx) => (
            <React.Fragment key={idx}>{item}</React.Fragment>
          ))}
        <div className="mt-3 min-h-[120px] md:min-h-[200px] lg:min-h-[144px] xl:min-h-[170px] 2xl:min-h-[140px]">
          <Text
            className="text-sm sm:text-base text-slate-300"
            italic
          >{`"${review}"`}</Text>
        </div>
        <Divider className="bg-slate-600" />
        <Meta
          avatar={<Avatar size={48}>{initials(stakeholder)}</Avatar>}
          className="text-slate-300 [&_.ant-card-meta-title]:text-neutral-300 [&_.ant-card-meta-description]:text-slate-400 [&_.ant-card-meta-title]:!mb-0"
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
    appendDots: (dots) => (
      <>
        <div className={`${styles['slick-dots']} ${styles['slick-thumb']}`}>
          {dots}
        </div>
      </>
    ),
    centerMode: false,
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
    <div className="px-8 pt-12 pb-12 sm:pb-20">
      <h1
        className="text-center mt-4 sm:mt-14 md:mt-28 !font-extrabold !text-white text-xl sm:text-3xl lg:text-4xl xl:!text-5xl"
        // level={2}
      >
        Loved by startups
      </h1>
      <Slider {...settings} className="my-2 sm:my-8 pb-0 sm:pb-8 z-10 mt-8">
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
