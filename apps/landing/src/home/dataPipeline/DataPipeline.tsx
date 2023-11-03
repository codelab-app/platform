import { faArrowTurnDownRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'
import { Integrations } from './Integrations'

const data = [
  {
    description:
      'Create remote API calls while having full headers control. Interact with a GraphQL backend using Query or Mutation.',
    icon: '/connectDB.svg',
    id: 1,
    image: '/imagePipeline.svg',
    title: 'Connect with REST/GraphQL API',
  },
  {
    description:
      'Create classes for your models to manipulate data using a domain driven design. Add store models with properties and methods.',
    icon: '/manageLocal.svg',
    id: 2,
    image: '/imagePipeline.svg',
    title: 'Manage Local State With Store',
  },
  {
    description:
      'Create a truly dynamic frontend system. Pass data through components and their descendants to bind to their props',
    icon: '/componentBinding.svg',
    id: 3,
    image: '/imagePipeline.svg',
    title: 'Component Data Binding',
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
    <section className="m-auto px-0 lg:px-8 xl:px-12 2xl:w-11/12 2xl:px-0">
      <div className="m-auto mb-12 w-11/12 bg-white p-0 lg:container md:mb-0 md:w-4/5 2xl:px-20">
        <h2 className="mt-10 px-0 text-center text-lg font-semibold text-violet-600 sm:text-2xl md:mt-14 lg:px-8 lg:text-4xl  xl:px-0 xl:text-5xl">
          Control Your Data Pipeline
        </h2>
        {data.map((items, index) => (
          <div
            className={`${
              isEvenNumber(items.id) === false
                ? 'lg:flex-row'
                : 'lg:flex-row-reverse'
            } mt-7 flex flex-col justify-between sm:mt-14 lg:mt-28`}
            key={index}
          >
            <div
              className={`${
                isEvenNumber(items.id) === false
                  ? 'lg:items-start'
                  : 'lg:items-end'
              } flex w-full flex-col items-center lg:w-2/5`}
            >
              <h1 className="w-fit rounded-[20px] bg-yellow-500 p-2 text-lg font-semibold text-white sm:p-4 sm:text-3xl lg:p-5 lg:text-4xl xl:p-6 xl:text-5xl">
                {items.id}
              </h1>
              <div className="mb-2 flex items-center md:mb-5">
                <Image
                  alt="item-logo"
                  height={24}
                  src={items.icon}
                  width={24}
                />
                <h4 className="m-0 ml-2 p-0 text-base sm:text-lg xl:text-xl">
                  {items.title}
                </h4>
              </div>
              <p
                className={`${
                  isEvenNumber(items.id) === false
                    ? 'lg:text-left'
                    : 'lg:text-right'
                } m-0 mb-2 px-4 text-center text-sm sm:p-0 sm:text-base md:mb-5 xl:text-lg`}
              >
                {items.description}
              </p>
              <Button
                className="mb-2 flex items-center px-0 text-base text-violet-500 md:text-lg lg:mb-0"
                type="link"
              >
                <FontAwesomeIcon className="mr-2" icon={faArrowTurnDownRight} />
                Learn More
              </Button>
            </div>

            <div className="m-auto w-80 sm:m-auto  sm:w-auto md:m-auto lg:m-0 lg:w-1/2 xl:m-0 xl:w-auto">
              <Image alt="image" height={306} src={items.image} width={564} />
            </div>
          </div>
        ))}
        <Integrations />
      </div>
    </section>
  )
}
