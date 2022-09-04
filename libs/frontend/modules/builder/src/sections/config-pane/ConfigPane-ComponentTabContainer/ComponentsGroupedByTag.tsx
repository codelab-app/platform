import { IBuilderService } from '@codelab/shared/abstract/core'
import { Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { GetComponentsList } from './GetComponentsList'

export const ComponentsGroupedByTag = ({
  componentsGroupedByTag,
}: Pick<IBuilderService, 'componentsGroupedByTag'>) => {
  // [tag, component[]]
  const tags = Object.keys(componentsGroupedByTag)

  return (
    <div css={tw`mb-5`}>
      {tags.map((tag) => (
        <React.Fragment key={tag}>
          <Typography.Title level={4}>{tag}</Typography.Title>
          <GetComponentsList components={componentsGroupedByTag[tag]} />
        </React.Fragment>
      ))}
    </div>
  )
}
