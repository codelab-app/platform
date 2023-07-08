import {
  faAtom,
  faDatabase,
  faFolders,
  faPaintbrush,
  faServer,
  faSliders,
} from '@fortawesome/pro-light-svg-icons'
import { Col, Row, Typography } from 'antd'
import React from 'react'
import { alignFullGridStyle } from '../../styles/style'
import { FeatureCard } from './FeatureCard'

const { Title } = Typography

const colProps = {
  style: {
    ...alignFullGridStyle,
  },
}

const featureItems = [
  {
    description:
      'We integrate with existing UI Frameworks such as Ant Design & Material UI so you can keep using the technologies you love. All component behavior can be configured via props',
    icon: faAtom,
    title: 'Build With UI Frameworks',
  },
  {
    description:
      'You can create higher level components from UI framework components, or compose your custom components from HTML',
    icon: faSliders,
    title: 'Create Custom Components',
  },
  {
    description:
      'Construct your DOM tree by composing & nesting components. This allows for complex components as you would get from coding',
    icon: faFolders,
    title: 'Component Nesting',
  },
  {
    description:
      'Use TailwindCSS to rapidly style your frontend. Bind variables to your styles and create a truly dynamic system',
    icon: faPaintbrush,
    title: 'Modular Design System',
  },
  {
    description:
      'We’ve integrated with Mobx to bring you a frontend state management solution. Yes we are opinionated and think it’s better than Redux',
    icon: faDatabase,
    title: 'State Management',
  },
  {
    description:
      'You’ve guessed it, we’re built on top of Vercel so you get all its benefits as well. Sandboxed AWS Lambda functions provide secure control to those functions',
    icon: faServer,
    title: 'Server Routing Control',
  },
]

export const BestPractices = () => {
  return (
    <section className="m-auto w-11/12 pb-0 xl:container md:pb-14">
      <div className="m-auto mt-8 py-4 sm:py-0">
        <Title
          className="mt-4 text-center !text-lg !font-extrabold !text-violet-600 sm:mt-14 sm:!text-2xl md:mt-28 md:!text-3xl lg:!text-4xl xl:!text-5xl"
          level={2}
        >
          Build with best practices: re-use & compose
        </Title>
        <div className="mb-11 px-4 text-center text-sm text-black  sm:px-0 sm:text-base md:text-lg">
          Re-use your knowledge of coding and apply them as you would with code.
          Think like a developer, but work more productively using our
          development platform. It’s like a smart IDE on steroids.
        </div>
        <Row className="m-auto w-11/12 justify-center pl-0 md:container md:pl-8 2xl:pl-0">
          {featureItems.map((items, index) => (
            <Col
              className="mb-8 mr-0 md:mr-8"
              key={index}
              lg={11}
              span={24}
              xl={11}
              xxl={7}
              {...colProps}
            >
              <FeatureCard
                description={items.description}
                icon={items.icon}
                title={items.title}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
