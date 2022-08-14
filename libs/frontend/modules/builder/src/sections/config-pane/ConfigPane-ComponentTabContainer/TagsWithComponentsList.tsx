import { IBuilderService } from '@codelab/shared/abstract/core'
import { Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { GetComponentsList } from './GetComponentsList'

export const TagsWithComponentsList = (
  props: Pick<IBuilderService, 'tagsWithComponents'>,
) => {
  const tagsWithComponents = props.tagsWithComponents

  return (
    <div css={tw`mb-5`}>
      {tagsWithComponents.map((tag) => (
        <div>
          <Typography.Title level={4}>{tag.name}</Typography.Title>
          <GetComponentsList components={tag.components} />
        </div>
      ))}
    </div>
  )
}
