'use client'

import type { UseEmblaCarouselType } from 'embla-carousel-react'

import { initials } from '@codelab/shared-utils'
import { faQuoteLeft, faStar } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card, Divider, Typography } from 'antd'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { CuiText } from '../components/CuiText'

type EmblaCarouselType = UseEmblaCarouselType[1]

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
    <div
      className={`
        flex size-full flex-col px-2
        sm:px-3
      `}
    >
      <div className="h-8 shrink-0" />
      <Card
        className={`
          flex max-w-[600px] flex-1 flex-col rounded-lg bg-transparent p-2
          sm:p-4
          [&_.ant-card-body]:flex [&_.ant-card-body]:flex-1 [&_.ant-card-body]:flex-col
        `}
      >
        <div className="flex justify-center">
          <span className="relative -mt-20 flex p-4">
            <FontAwesomeIcon
              className={`
                size-20
                [&_path]:fill-yellow-400
              `}
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
                  size-5 pr-1.5
                  [&_path]:fill-yellow-400
                `}
                icon={faStar}
                key={idx}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            ))}
        </div>
        <div className="mt-3 grow">
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
      'As a marketing agency, we needed to quickly prototype and deploy custom landing pages for our clients. This platform allowed us to deliver professional, interactive websites in a fraction of the time it would take with traditional development.',
    role: 'Marketing Director @ Kea Digital',
    stakeholder: 'Giselle Lo',
  },
]

export const TestimonialSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
      skipSnaps: false,
      slidesToScroll: 1,
      containScroll: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<Array<number>>([])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const onSelect = useCallback((emblaInstance: EmblaCarouselType) => {
    if (!emblaInstance) {
      return
    }

    const index = emblaInstance.selectedScrollSnap()
    setSelectedIndex(index)
  }, [])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect(emblaApi)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

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
        variant="section-title"
      >
        Loved by startups
      </CuiText>

      {/* Embla Carousel with CSS-based responsive slides */}
      <div className="mx-auto mt-8 max-w-6xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-stretch">
            {testimonialItems.map((item, index) => (
              <div
                className={`
                  flex min-w-0 shrink-0 grow-0 basis-full
                  md:basis-1/2
                  lg:basis-1/3
                `}
                key={index}
              >
                <TestimonialItem
                  review={item.review}
                  role={item.role}
                  stakeholder={item.stakeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Dots Navigation - only show 2 dots for large screens */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {scrollSnaps
              .slice(0, Math.min(scrollSnaps.length, 2))
              .map((_, index) => (
                <button
                  aria-label={`Go to slide ${index + 1}`}
                  className={`
                    size-2 rounded-full transition-all duration-300
                    ${
                      selectedIndex % 2 === index
                        ? 'w-8 bg-amber-600'
                        : 'bg-gray-400'
                    }
                  `}
                  key={index}
                  onClick={() => scrollTo(index)}
                  type="button"
                />
              ))}
          </div>
        </div>
      </div>

      <div className="mt-12" />
    </div>
  )
}
