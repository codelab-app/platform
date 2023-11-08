import { faCheck } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'antd'
import classNames from 'classnames'
import * as React from 'react'

const pricingItems = [
  {
    benefit: 'No cost forever',
    bgColor: 'bg-violet-700 hover:bg-violet-700',
    borderColor: 'border-purple-300',
    description: [
      'Frontend state management solution',
      'Component configuration using props data',
      "Query & mutation system for integrating external API's",
      'Ant Design & Material UI components',
      'Write JSX inside components',
    ],
    descriptionColor: 'text-white',
    price: '$0',
    title: 'Starter',
    titleColor: 'text-white',
    type: 'Start for free',
  },
  {
    benefit: '2 weeks trial',
    bgColor: 'bg-purple-100 hover:bg-purple-100',
    borderColor: 'border-violet-700',
    description: [
      'Runtime data & props validation',
      'Error logging for all RESTful calls',
      'Form generation from schema',
      'Daily backup with restore',
    ],
    descriptionColor: 'text-violet-900',
    price: '$19',
    title: 'Developer',
    titleColor: 'text-violet-700',
    type: 'Demo Product',
  },
  {
    benefit: '2 weeks trial',
    bgColor: 'bg-purple-100 hover:bg-purple-100',
    borderColor: 'border-violet-700',
    description: [
      'Custom domain',
      'Version control with rollback',
      'Custom components',
      'Environments',
      'Design system for styles',
      'Preset admin, editor, user roles',
    ],
    descriptionColor: 'text-violet-900',
    price: '$149',
    title: 'Business',
    titleColor: 'text-violet-700',
    type: 'Demo Product',
  },
  {
    benefit: '',
    bgColor: 'bg-white hover:bg-white',
    borderColor: 'border-violet-700',
    description: [
      'Custom domain',
      'Version control with rollback',
      'Custom components',
      'Environments',
      'Design system for styles',
      'Preset admin, editor, user roles',
    ],
    descriptionColor: 'text-violet-900',
    price: 'Custom',
    title: 'Enterprise',
    titleColor: 'text-violet-700',
    type: 'Contact Sales',
  },
]

export const PricingBody = () => {
  return (
    <section className="m-auto w-11/12 pb-14 xl:container">
      <Row className="m-auto flex w-4/5 justify-evenly sm:w-[65%] md:w-full 2xl:w-11/12">
        {pricingItems.map((items, index) => (
          <Col
            className={classNames(
              items.bgColor,
              'mb-3 w-full border-2 border-solid border-violet-300 p-7 md:w-[48%] xl:mb-0 xl:w-[24%]',
            )}
            key={index}
          >
            <div
              className={classNames(
                items.borderColor,
                'w-fit m-auto pb-2 mb-4 sm:mb-8 border-0 border-b-2 border-solid',
              )}
            >
              <p
                className={classNames(
                  items.titleColor,
                  'text-2xl md:text-3xl mt-2 sm:mt-4 text-center mb-3 sm:mb-6 font-black',
                )}
              >
                {items.title}
              </p>
              <div className="mb-6 flex h-fit items-end justify-center font-extrabold">
                <h1
                  className={classNames(
                    items.titleColor,
                    'text-4xl md:text-5xl mb-0 mr-2',
                  )}
                >
                  {items.price}
                </h1>
                {items.price === 'Custom' ? (
                  ''
                ) : (
                  <h5
                    className={classNames(
                      items.titleColor,
                      'text-xl md:text-2xl mb-0',
                    )}
                  >
                    /mo
                  </h5>
                )}
              </div>
              <Button
                className={classNames(
                  items.bgColor,
                  items.borderColor,
                  items.titleColor,
                  'border-2 border-solid rounded-lg  flex m-auto items-center px-10 sm:px-14 lg:px-20 xl:px-10 2xl:px-14 py-6',
                )}
                // ghost
              >
                <a className="text-base font-bold text-black lg:text-xl">
                  {items.type}
                </a>
              </Button>
              <p className="mb-2 mt-4 min-h-[25px] text-center text-base text-violet-400 sm:mb-4 sm:mt-6 md:text-lg">
                {items.benefit ? items.benefit : ''}
              </p>
            </div>
            <div className="px-0 sm:px-4 md:px-0 lg:px-4 xl:px-0 2xl:px-4">
              <ul className="list-none p-0">
                {items.description.map((list, descriptionIndex) => (
                  <li className="flex" key={descriptionIndex}>
                    <FontAwesomeIcon
                      className={classNames(
                        items.descriptionColor,
                        'text-sm sm:text-lg mt-1 md:text-xl mr-2',
                      )}
                      icon={faCheck}
                    />
                    <p
                      className={classNames(
                        items.descriptionColor,
                        'text-base md:text-xl mb-3',
                      )}
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
