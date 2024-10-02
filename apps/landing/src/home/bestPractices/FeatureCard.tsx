import type { IconDefinition } from '@fortawesome/pro-light-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'antd'

interface FeatureCardProps {
  description: string
  icon: IconDefinition
  title: string
}

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <Card
      className={`
        shadow-[rgba(99, 99, 0.2)
        0px 2px 8px
        0px] flex min-h-fit
        w-full items-start rounded-lg
        border-none p-4
        2xl:h-[300px]
        lg:h-[300px]
        md:h-[260px] md:p-4
        sm:h-[270px] sm:p-2
        xl:h-[280px]
      `}
    >
      <div className="size-full">
        <div
          className={`
            mb-5 flex w-fit
            rounded-2xl bg-violet-100 p-2
            text-right text-xs
            2xl:!text-sm
            sm:p-4 sm:text-center
          `}
        >
          <FontAwesomeIcon
            className="[&_path]:fill-violet-7000"
            icon={props.icon}
            size="3x"
          />
        </div>
        <Card.Meta
          className={`
            [&_.ant-card-meta-description]:sm-text-base
            [&_.ant-card-meta-description]:mt-3
            [&_.ant-card-meta-description]:text-sm
            [&_.ant-card-meta-description]:text-black
            [&_.ant-card-meta-title]:w-full
            [&_.ant-card-meta-title]:font-display
            [&_.ant-card-meta-title]:text-base
            [&_.ant-card-meta-title]:font-extrabold
            [&_.ant-card-meta-title]:sm:text-lg
            [&_.ant-card-meta-title]:md:text-2xl
            [&_.ant-card-meta-title]:lg:text-xl
          `}
          description={props.description}
          title={props.title}
        />
      </div>
    </Card>
  )
}
