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
    <section>
      <div css={tw`bg-white m-auto container py-12`}>
        <h2 css={tw`text-5xl text-violet-600 font-semibold pt-28  text-center`}>
          Control Your Data Pipeline
        </h2>
        {data.map((items) => (
          <div
            css={[
              isEvenNumber(items.id) === false
                ? tw`flex-row`
                : tw`flex-row-reverse `,
              tw`flex mt-28 justify-between`,
            ]}
          >
            <div
              css={[
                isEvenNumber(items.id) === false
                  ? tw`items-start`
                  : tw`items-end`,
                tw`w-2/5 flex flex-col`,
              ]}
            >
              <h1
                css={tw`text-white bg-yellow-500 p-6 w-fit rounded-[20px] font-semibold text-5xl`}
              >
                {items.id}
              </h1>
              <div css={tw`flex items-center mb-5`}>
                <Image
                  alt="item-logo"
                  height={24}
                  src={items.icon}
                  width={24}
                />
                <h4 css={tw`p-0 m-0 ml-2 text-xl`}>{items.title}</h4>
              </div>
              <p
                css={[
                  isEvenNumber(items.id) === false ? tw`` : tw`text-right`,
                  tw`p-0 m-0 text-lg mb-5`,
                ]}
              >
                {items.description}
              </p>
              <Button
                css={tw`text-violet-500 text-lg px-0 flex items-center`}
                type="link"
              >
                <FontAwesomeIcon css={tw`mr-2`} icon={faArrowTurnDownRight} />
                Learn More
              </Button>
            </div>

            <Image alt="image" height={306} src={items.image} width={564} />
          </div>
        ))}
        <Integrations />
      </div>
    </section>
  )
}
