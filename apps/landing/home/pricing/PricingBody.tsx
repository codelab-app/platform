import { faCheck } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'antd'
import * as React from 'react'
import tw from 'twin.macro'

const pricingItems = [
  {
    benefit: 'No cost forever',
    bgColor: tw`bg-violet-700 hover:bg-violet-700`,
    borderColor: tw`border-purple-300`,
    description: [
      'Frontend state management solution',
      'Component configuration using props data',
      "Query & mutation system for integrating external API's",
      'Ant Design & Material UI components',
      'Write JSX inside components',
    ],
    descriptionColor: tw`text-white`,
    price: '$0',
    title: 'Starter',
    titleColor: tw`text-white`,
    type: 'Start for free',
  },
  {
    benefit: '2 weeks trial',
    bgColor: tw`bg-purple-100 hover:bg-purple-100 `,
    borderColor: tw`border-violet-700`,
    description: [
      'Runtime data & props validation',
      'Error logging for all RESTful calls',
      'Form generation from schema',
      'Daily backup with restore',
    ],
    descriptionColor: tw`text-violet-900`,
    price: '$19',
    title: 'Developer',
    titleColor: tw`text-violet-700`,
    type: 'Demo Product',
  },
  {
    benefit: '2 weeks trial',
    bgColor: tw`bg-purple-100 hover:bg-purple-100`,
    borderColor: tw`border-violet-700`,
    description: [
      'Custom domain',
      'Version control with rollback',
      'Custom components',
      'Environments',
      'Design system for styles',
      'Preset admin, editor, user roles',
    ],
    descriptionColor: tw`text-violet-900`,
    price: '$149',
    title: 'Business',
    titleColor: tw`text-violet-700`,
    type: 'Demo Product',
  },
  {
    benefit: '',
    bgColor: tw`bg-white hover:bg-white`,
    borderColor: tw`border-violet-700`,
    description: [
      'Custom domain',
      'Version control with rollback',
      'Custom components',
      'Environments',
      'Design system for styles',
      'Preset admin, editor, user roles',
    ],
    descriptionColor: tw`text-violet-900`,
    price: 'Custom',
    title: 'Enterprise',
    titleColor: tw`text-violet-700`,
    type: 'Contact Sales',
  },
]

export const PricingBody = () => {
  return (
    <section css={tw`w-11/12 m-auto xl:container pb-14`}>
      <Row
        css={tw`flex w-4/5 sm:w-[65%] md:w-full 2xl:w-11/12 m-auto justify-evenly`}
      >
        {pricingItems.map((items, index) => (
          <Col
            css={[
              items.bgColor,
              tw`p-7 mb-3 xl:mb-0 w-full md:w-[48%] xl:w-[24%] border-solid border-2 border-violet-300 `,
            ]}
            key={index}
          >
            <div
              css={[
                items.borderColor,
                tw` w-fit m-auto pb-2 mb-4 sm:mb-8 border-0 border-b-2 border-solid `,
              ]}
            >
              <p
                css={[
                  items.titleColor,
                  tw`text-2xl md:text-3xl mt-2 sm:mt-4 text-center mb-3 sm:mb-6 font-black`,
                ]}
              >
                {items.title}
              </p>
              <div
                css={[
                  tw`font-extrabold flex items-end mb-6 h-fit justify-center`,
                ]}
              >
                <h1
                  css={[items.titleColor, tw`text-4xl md:text-5xl mb-0 mr-2`]}
                >
                  {items.price}
                </h1>
                {items.price === 'Custom' ? (
                  ''
                ) : (
                  <h5 css={[items.titleColor, tw`text-xl md:text-2xl mb-0`]}>
                    /mo
                  </h5>
                )}
              </div>
              <Button
                css={[
                  items.bgColor,
                  items.borderColor,
                  items.titleColor,
                  tw`border-2 border-solid rounded-lg  flex m-auto items-center px-10 sm:px-14 lg:px-20 xl:px-10 2xl:px-14 py-6`,
                ]}
                // ghost
              >
                <a css={[tw`text-black text-base lg:text-xl font-bold`]}>
                  {items.type}
                </a>
              </Button>
              <p
                css={[
                  tw`text-violet-400 text-base md:text-lg min-h-[25px] text-center mt-4 mb-2 sm:mb-4 sm:mt-6`,
                ]}
              >
                {items.benefit ? items.benefit : ''}
              </p>
            </div>
            <div css={tw`px-0 sm:px-4 md:px-0 lg:px-4 xl:px-0 2xl:px-4`}>
              <ul css={tw`list-none p-0`}>
                {items.description.map((list, descriptionIndex) => (
                  <li css={tw`flex `} key={descriptionIndex}>
                    <FontAwesomeIcon
                      css={[
                        items.descriptionColor,
                        tw`text-sm sm:text-lg mt-1 md:text-xl mr-2`,
                      ]}
                      icon={faCheck}
                    />
                    <p
                      css={[
                        items.descriptionColor,
                        tw`text-base md:text-xl mb-3`,
                      ]}
                    >
                      {list}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  )
}
