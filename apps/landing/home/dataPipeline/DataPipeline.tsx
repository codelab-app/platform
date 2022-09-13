import { faArrowTurnDownRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'
import { Integrations } from './Integrations'

const data = [
  {
    id: 1,
    title: 'Connect with REST/GraphQL API',
    image: '/imagePipeline.svg',
    icon: '/connectDB.svg',
    description:
      'Create remote API calls while having full headers control. Interact with a GraphQL backend using Query or Mutation.',
  },
  {
    id: 2,
    title: 'Manage Local State With Store',
    image: '/imagePipeline.svg',
    icon: '/manageLocal.svg',
    description:
      'Create classes for your models to manipulate data using a domain driven design. Add store models with properties and methods.',
  },
  {
    id: 3,
    title: 'Component Data Binding',
    image: '/imagePipeline.svg',
    icon: '/componentBinding.svg',
    description:
      'Create a truly dynamic frontend system. Pass data through components and their descendants to bind to their props',
  },
]

const isEvenNumber = (num: number) => {
  if (!num) {
    return
  }

  if (num % 2 === 0) {
    return true
  } else {
    return false
  }
}

export const DataPipeline = () => {
  return (
    <section css={tw`px-0 lg:px-8 xl:px-12 2xl:w-11/12 m-auto 2xl:px-0`}>
      <div
        css={tw`bg-white m-auto w-11/12 md:w-4/5 px-0 2xl:px-20 lg:container mb-12 md:mb-0 py-0 `}
      >
        <h2
          css={tw`text-lg sm:text-2xl lg:text-4xl xl:text-5xl text-violet-600 font-semibold mt-10 px-0 lg:px-8 xl:px-0  md:mt-14 text-center`}
        >
          Control Your Data Pipeline
        </h2>
        {data.map((items, index) => (
          <div
            css={[
              isEvenNumber(items.id) === false
                ? tw`lg:flex-row`
                : tw`lg:flex-row-reverse `,
              tw`flex flex-col mt-7 sm:mt-14 lg:mt-28 justify-between`,
            ]}
            key={index}
          >
            <div
              css={[
                isEvenNumber(items.id) === false
                  ? tw`lg:items-start`
                  : tw`lg:items-end`,
                tw`w-full items-center lg:w-2/5 flex flex-col`,
              ]}
            >
              <h1
                css={tw`text-white bg-yellow-500 p-2 sm:p-4 lg:p-5 xl:p-6 w-fit rounded-[20px] font-semibold text-lg sm:text-3xl lg:text-4xl xl:text-5xl`}
              >
                {items.id}
              </h1>
              <div css={tw`flex items-center mb-2 md:mb-5`}>
                <Image
                  alt="item-logo"
                  height={24}
                  src={items.icon}
                  width={24}
                />
                <h4 css={tw`p-0 m-0 ml-2 text-base sm:text-lg xl:text-xl`}>
                  {items.title}
                </h4>
              </div>
              <p
                css={[
                  isEvenNumber(items.id) === false
                    ? tw`lg:text-left`
                    : tw`lg:text-right`,
                  tw`px-4 sm:p-0 m-0 text-sm sm:text-base text-center xl:text-lg mb-2 md:mb-5`,
                ]}
              >
                {items.description}
              </p>
              <Button
                css={tw`text-violet-500 text-base md:text-lg px-0 lg:mb-0 mb-2 flex items-center`}
                type="link"
              >
                <FontAwesomeIcon css={tw`mr-2`} icon={faArrowTurnDownRight} />
                Learn More
              </Button>
            </div>

            <div
              css={tw`w-80 sm:w-auto lg:w-1/2  md:m-auto xl:w-auto lg:m-0 xl:m-0 m-auto sm:m-auto`}
            >
              <Image alt="image" height={306} src={items.image} width={564} />
            </div>
          </div>
        ))}
        <Integrations />
      </div>
    </section>
  )
}
