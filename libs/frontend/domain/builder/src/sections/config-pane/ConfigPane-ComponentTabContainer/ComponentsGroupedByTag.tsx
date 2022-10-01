import { IBuilderService } from '@codelab/frontend/abstract/core'
import { Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { GetComponentsList } from './GetComponentsList'

export const ComponentsGroupedByTag = ({
  componentsGroupedByCategory,
}: Pick<IBuilderService, 'componentsGroupedByCategory'>) => {
  console.log(componentsGroupedByCategory)

  const tags = Object.keys(componentsGroupedByCategory)

  return (
    <div css={tw`mb-5`}>
      {tags.map((tag) => (
        <React.Fragment key={tag}>
          <Typography.Title level={4}>{tag}</Typography.Title>
          <GetComponentsList components={componentsGroupedByCategory[tag]} />
        </React.Fragment>
      ))}
    </div>
  )
}
