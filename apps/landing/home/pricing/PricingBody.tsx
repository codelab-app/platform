import { css } from '@emotion/react'
import { faCheck } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'antd'
import * as React from 'react'
import tw from 'twin.macro'

const generateTextColor = (key: string) => {
  switch (key) {
    case 'textWhite':
      return tw`text-white `
    case 'textViolet700':
      return tw`text-violet-700`
    case 'textViolet900':
      return tw`text-violet-900`
    case 'bgWhite':
      return tw`bg-white hover:bg-white`
    case 'bgViolet':
      return tw`bg-violet-700 hover:bg-violet-700`
    case 'borderPurple':
      return tw`border-purple-300 `
    case 'borderViolet':
      return tw`border-violet-700`
    default:
      return tw`bg-purple-100 hover:bg-purple-100 `
  }
}

const pricingItems = [
  {
    title: 'Starter',
    price: '$0',
    type: 'Start for free',
    benefit: 'No cost forever',
    bgColor: 'bgViolet',
    titleColor: 'textWhite',
    borderColor: 'borderPurple',
    descriptionColor: 'textWhite',
    description: [
      'Frontend state management solution',
      'Component configuration using props data',
      "Query & mutation system for integrating external API's",
      'Ant Design & Material UI components',
      'Write JSX inside components',
    ],
  },
  {
    title: 'Developer',
    price: '$19',
    type: 'Demo Product',
    benefit: '2 weeks trial',
    bgColor: 'default',
    titleColor: 'textViolet700',
    borderColor: 'borderViolet',
    descriptionColor: 'textViolet900textWhite',
    description: [
      'Runtime data & props validation',
      'Error logging for all RESTful calls',
      'Form generation from schema',
      'Daily backup with restore',
    ],
  },
  {
    title: 'Business',
    price: '$149',
    type: 'Demo Product',
    benefit: '2 weeks trial',
    bgColor: 'default',
    titleColor: 'textViolet700',
    borderColor: 'borderViolet',
    descriptionColor: 'textViolet900',
    description: [
      'Custom domain',
      'Version control with rollback',
      'Custom components',
      'Environments',
      'Design system for styles',
      'Preset admin, editor, user roles',
    ],
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    type: 'Contact Sales',
    bgColor: 'bgWhite',
    benefit: '',
    titleColor: 'textViolet700',
    borderColor: 'borderViolet',
    descriptionColor: 'textViolet900',
    description: [
      'Custom domain',
      'Version control with rollback',
      'Custom components',
      'Environments',
      'Design system for styles',
      'Preset admin, editor, user roles',
    ],
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
              generateTextColor(items.bgColor),
              tw`p-7 mb-3 xl:mb-0 w-full md:w-[48%] xl:w-[24%] border-solid border-2 border-violet-300 `,
            ]}
            key={index}
          >
            <div
              css={[
                generateTextColor(items.borderColor),
                tw` w-fit m-auto pb-2 mb-4 sm:mb-8 border-0 border-b-2 border-solid `,
              ]}
            >
              <p
                css={[
                  generateTextColor(items.titleColor),
                  tw`text-2xl md:text-3xl mt-2 sm:mt-4 text-center mb-3 sm:mb-6 font-black`,
                ]}
              >
                {items.title}
              </p>
              <div
                css={tw`font-extrabold flex items-end mb-6 h-fit justify-center`}
              >
                <h1
                  css={[
                    generateTextColor(items.titleColor),
                    tw`text-4xl md:text-5xl mb-0 mr-2`,
                  ]}
                >
                  {items.price}
                </h1>
                {items.price === 'Custom' ? (
                  ''
                ) : (
                  <h5
                    css={[
                      generateTextColor(items.titleColor),
                      tw`text-xl md:text-2xl mb-0`,
                    ]}
                  >
                    /mo
                  </h5>
                )}
              </div>
              <Button
                css={[
                  // css`
                  //   color: ${items.titleColor}!important;
                  //   border-color: ${items.borderColor}!important;
                  // `,
                  generateTextColor(items.bgColor),
                  generateTextColor(items.titleColor),
                  generateTextColor(items.borderColor),
                  tw`border-2 border-solid rounded-lg  flex m-auto items-center px-10 sm:px-14 lg:px-20 xl:px-10 2xl:px-14 py-6`,
                ]}
                // ghost
              >
                <a
                  css={[
                    generateTextColor(items.titleColor),
                    tw`text-black text-base lg:text-xl font-bold`,
                  ]}
                >
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
                {items.description.map((list, i) => (
                  <li css={tw`flex `} key={i}>
                    <FontAwesomeIcon
                      css={[
                        generateTextColor(items.descriptionColor),
                        tw`text-sm sm:text-lg mt-1 md:text-xl mr-2`,
                      ]}
                      icon={faCheck}
                    />
                    <p
                      css={[
                        generateTextColor(items.descriptionColor),
                        tw`text-base md:text-xl`,
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
