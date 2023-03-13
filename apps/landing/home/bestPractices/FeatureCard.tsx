import { css } from '@emotion/react'
import type { IconDefinition } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'antd'
import React from 'react'
import tw from 'twin.macro'

interface FeatureCardProps {
  description: string
  icon: IconDefinition
  title: string
}

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <Card
      css={tw`flex items-start min-h-fit sm:h-[270px] md:h-[260px] lg:h-[300px] xl:h-[280px] 2xl:h-[300px] w-full rounded-lg border-none p-4 sm:p-2 md:p-4 shadow-[rgba(99, 99, 99, 0.2) 0px 2px 8px 0px]`}
    >
      <div css={tw`w-full h-full`}>
        <div
          css={tw`flex w-fit bg-violet-100 text-xs 2xl:!text-sm text-right sm:text-center mb-5 p-2 sm:p-4 rounded-2xl`}
        >
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
              ${tw`text-base sm:text-lg md:text-2xl lg:text-xl w-full font-display font-extrabold`}
            }
            .ant-card-meta-description {
              ${tw`text-sm sm:text-base text-black mt-3`}
            }
          `}
          description={props.description}
          title={props.title}
        />
      </div>
    </Card>
  )
}
