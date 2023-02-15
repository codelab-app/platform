import { faArrowRight, faTag } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

export interface ITutorialsItem {
  image: string
  title: string
  description: string
  tags: Array<string>
}

export interface TutorialsBodyProps {
  tutorials: Array<ITutorialsItem>
}

export const TutorialsBody = ({ tutorials }: TutorialsBodyProps) => {
  return (
    <section css={tw`w-11/12 m-auto xl:container pb-14`}>
      <Row css={tw`w-3/4 lg:w-11/12 xl:w-4/5 m-auto mb-0 pb-14`}>
        {tutorials.map((item, index) => (
          <Col css={tw`w-full lg:w-[47%] m-auto mb-16`} key={index}>
            <div
              css={tw`relative mb-4 w-full h-[180px] sm:h-[260px] md:h-[300px] lg:h-[260px] xl:h-[300px]`}
            >
              <Image
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 47vw"
                src={item.image}
              />
            </div>
            <h5 css={tw`text-base md:text-xl lg:text-lg 2xl:text-2xl`}>
              {item.title}
            </h5>
            <p css={tw`text-sm md:text-base lg:text-sm 2xl:text-base mb-2`}>
              {item.description}
            </p>
            <Button
              css={tw`text-violet-500 text-sm md:text-base lg:text-sm 2xl:text-base px-0 lg:mb-0 mb-4 flex items-center`}
              type="link"
            >
              Learn More
              <FontAwesomeIcon css={tw`ml-2`} icon={faArrowRight} />
            </Button>
            <div css={tw`flex items-center mt-2`}>
              <FontAwesomeIcon css={tw`mr-2 text-xl`} icon={faTag} />
              <div css={tw`flex flex-wrap gap-2`}>
                {item.tags.map((tag, tagIndex) => (
                  <p
                    css={tw`mb-0 bg-gray-100 border-solid border-2 border-gray-200 px-2`}
                    key={tagIndex}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  )
}
