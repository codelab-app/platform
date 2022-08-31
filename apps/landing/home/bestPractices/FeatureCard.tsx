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
      <div css={tw`p-4`}>
        <div css={tw`flex bg-violet-100 mb-4 p-4 rounded-lg`}>
          <FontAwesomeIcon
            css={[
              css`
                path {
                  ${tw`fill-violet-700`}
                }
              `,
            ]}
            icon={props.icon}
            size="3x"
          />
        </div>
        <Card.Meta
          css={css`
            .ant-card-meta-title {
              ${tw`text-2xl font-display font-extrabold`}
            }
            .ant-card-meta-description {
              ${tw`text-base text-black`}
            }
          `}
          description={props.description}
          title={props.title}
        />
      </div>
    </Card>
  )
}
