import { IBuilderService } from '@codelab/shared/abstract/core'
import { Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { GetComponentsList } from './GetComponentsList'

export const ComponentsGroupedByTag = (
  props: Pick<IBuilderService, 'componentsGroupedByTag'>,
) => {
  const componentsGroupedByTag = props.componentsGroupedByTag
  // [tag, component[]]
  const tags = Object.keys(componentsGroupedByTag)

  return (
    <div css={tw`mb-5`}>
      {tags.map((tag) => (
        <div key={tag}>
          <Typography.Title level={4}>{tag}</Typography.Title>
          <GetComponentsList components={componentsGroupedByTag[tag]} />
        </div>
      ))}
    </div>
  )
}
