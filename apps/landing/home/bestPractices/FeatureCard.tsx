import { css } from '@emotion/react'
import { IconDefinition } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { cardStyle } from '../../styles/style'

type FeatureCardProps = {
  icon: IconDefinition
  description: string
  title: string
}

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <Card style={cardStyle}>
      <Card.Meta
        avatar={
          <div css={tw`flex bg-violet-100 rounded-lg`}>
            <FontAwesomeIcon
              css={[
                css`
                  path {
                    ${tw`fill-violet-700`}
                  }
                `,
              ]}
              icon={props.icon}
              size="2x"
            />
          </div>
        }
        css={css`
          .ant-card-meta-title {
            ${tw`font-display font-extrabold`}
          }
        `}
        description={props.description}
        title={props.title}
      />
    </Card>
  )
}
