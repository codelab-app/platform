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
import { alignFullGridStyle, padding, threeGridCol } from '../../styles/style'
import { FeatureCard } from './FeatureCard'

const { Text, Link, Title } = Typography

const colProps = {
  ...threeGridCol,
  style: {
    ...alignFullGridStyle,
  },
}

export const BestPractices = () => {
  return (
    <section className="container" css={tw`m-auto`}>
      <Title
        css={tw`text-center !font-extrabold !text-violet-600 !text-4xl`}
        level={2}
      >
        Build with best practices: re-use & compose
      </Title>
      <div css={tw`text-center text-base text-slate-500`}>
        Re-use your knowledge of coding and apply them as you would with code.
        Think like a developer, but work more productively using our development
        platform. It’s like a smart IDE on steroids.
      </div>
      <Row align="middle" gutter={[padding.sm, padding.sm]}>
        <Col {...colProps}>
          <FeatureCard
            description="We integrate with existing UI Frameworks such as Ant Design & Material UI so you can keep using the technologies you love. All component behavior can be configured via props"
            icon={faAtom}
            title="Build With UI Frameworks"
          />
        </Col>
        <Col {...colProps}>
          <FeatureCard
            description="You can create higher level components from UI framework components, or compose your custom components from HTML"
            icon={faSliders}
            title="Create Custom Components"
          />
        </Col>
        <Col {...colProps}>
          <FeatureCard
            description="Construct your DOM tree by composing & nesting components. This allows for complex components as you would get from coding"
            icon={faFolders}
            title="Component Nesting"
          />
        </Col>
        <Col {...colProps}>
          <FeatureCard
            description="Use TailwindCSS to rapidly style your frontend. Bind variables to your styles and create a truly dynamic system"
            icon={faPaintbrush}
            title="Modular Design System"
          />
        </Col>
        <Col {...colProps}>
          <FeatureCard
            description="We’ve integrated with Mobx to bring you a frontend state management solution. Yes we are opinionated and think it’s better than Redux"
            icon={faDatabase}
            title="State Management"
          />
        </Col>
        <Col {...colProps}>
          <FeatureCard
            description="You’ve guessed it, we’re built on top of Vercel so you get all its benefits as well. Sandboxed AWS Lambda functions provide secure control to those functions"
            icon={faServer}
            title="Server Routing Control"
          />
        </Col>
      </Row>
    </section>
  )
}
