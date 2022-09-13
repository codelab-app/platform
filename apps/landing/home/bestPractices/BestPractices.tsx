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
import tw from 'twin.macro'
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
    icon: faAtom,
    title: 'Build With UI Frameworks',
    description:
      'We integrate with existing UI Frameworks such as Ant Design & Material UI so you can keep using the technologies you love. All component behavior can be configured via props',
  },
  {
    icon: faSliders,
    title: 'Create Custom Components',
    description:
      'You can create higher level components from UI framework components, or compose your custom components from HTML',
  },
  {
    icon: faFolders,
    title: 'Component Nesting',
    description:
      'Construct your DOM tree by composing & nesting components. This allows for complex components as you would get from coding',
  },
  {
    icon: faPaintbrush,
    title: 'Modular Design System',
    description:
      'Use TailwindCSS to rapidly style your frontend. Bind variables to your styles and create a truly dynamic system',
  },
  {
    icon: faDatabase,
    title: 'State Management',
    description:
      'We’ve integrated with Mobx to bring you a frontend state management solution. Yes we are opinionated and think it’s better than Redux',
  },
  {
    icon: faServer,
    title: 'Server Routing Control',
    description:
      'You’ve guessed it, we’re built on top of Vercel so you get all its benefits as well. Sandboxed AWS Lambda functions provide secure control to those functions',
  },
]

export const BestPractices = () => {
  return (
    <section css={tw`w-11/12 m-auto xl:container md:pb-14 pb-0`}>
      <div css={tw`m-auto py-4 mt-8 sm:py-0`}>
        <Title
          css={tw`text-center mt-4 sm:mt-14 md:mt-28 !text-lg sm:!text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl !font-extrabold !text-violet-600 `}
          level={2}
        >
          Build with best practices: re-use & compose
        </Title>
        <div
          css={tw`text-center mb-11 text-sm px-4 sm:px-0  sm:text-base md:text-lg text-slate-500 text-black`}
        >
          Re-use your knowledge of coding and apply them as you would with code.
          Think like a developer, but work more productively using our
          development platform. It’s like a smart IDE on steroids.
        </div>
        <Row
          css={tw`justify-center pl-0 md:pl-8 2xl:pl-0 m-auto w-11/12 md:container`}
        >
          {featureItems.map((items, index) => (
            <Col
              css={tw`mr-0 md:mr-8 mb-8`}
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
