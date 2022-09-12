import { faArrowRight, faTag } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

const tutorialsItem = [
  {
    image: '/TutorialsImage.svg',
    title: 'Mrhost Online Travel Agency Listing',
    description:
      'Learn how Mrhost, a web-based marketplace for room reservation, uses Codelab to create their frontend for filtering room listings',
    tags: ['Card', ' Google Maps', 'Button'],
  },
  {
    image: '/TutorialsImage.svg',
    title: 'Mrhost Online Travel Agency Listing',
    description:
      'Learn how Mrhost, a web-based marketplace for room reservation, uses Codelab to create their frontend for filtering room listings',
    tags: ['Card', ' Google Maps', 'Button'],
  },
  {
    image: '/TutorialsImage.svg',
    title: 'Mrhost Online Travel Agency Listing',
    description:
      'Learn how Mrhost, a web-based marketplace for room reservation, uses Codelab to create their frontend for filtering room listings',
    tags: ['Card', ' Google Maps', 'Button'],
  },
  {
    image: '/TutorialsImage.svg',
    title: 'Mrhost Online Travel Agency Listing',
    description:
      'Learn how Mrhost, a web-based marketplace for room reservation, uses Codelab to create their frontend for filtering room listings',
    tags: ['Card', ' Google Maps', 'Button'],
  },
]

export const TutorialsBody = () => {
  return (
    <section css={tw`w-11/12 m-auto xl:container pb-14`}>
      <Row css={tw`w-3/4 lg:w-11/12 xl:w-4/5 m-auto pb-14`}>
        {tutorialsItem.map((item, index) => (
          <Col css={tw`w-full lg:w-[47%] m-auto mb-16`} key={index}>
            <div css={tw`mb-4 w-full`}>
              <Image alt="image" height={308} src={item.image} width={623} />
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
              {item.tags.map((tag, i) => (
                <p
                  css={tw`mb-0 mr-2 bg-gray-100 border-solid border-2 border-gray-200  px-2 `}
                  key={i}
                >
                  {tag}
                </p>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </section>
  )
}
