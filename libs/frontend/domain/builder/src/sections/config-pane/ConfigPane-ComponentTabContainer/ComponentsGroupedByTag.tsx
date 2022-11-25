import { IBuilderService } from '@codelab/frontend/abstract/core'
import { Typography } from 'antd'
import React from 'react'
import { GetComponentsList } from './GetComponentsList'

export const ComponentsGroupedByTag = ({
  componentsGroupedByCategory,
}: Pick<IBuilderService, 'componentsGroupedByCategory'>) => {
  const tags = Object.keys(componentsGroupedByCategory)

  return (
    <>
      {tags.map((tag) => (
        <React.Fragment key={tag}>
          <Typography.Title level={4}>{tag}</Typography.Title>
          <GetComponentsList
            components={componentsGroupedByCategory[tag] ?? []}
          />
        </React.Fragment>
      ))}
    </>
  )
}
