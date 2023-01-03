import { Card } from 'antd'
import capitalize from 'lodash/capitalize'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export interface IDemoResource {
  id: string
  title: string
  cover: string
  description: string
  url: string
}

interface GetDemoResourceItemProps {
  resource: IDemoResource
}

export const GetDemoResourcesItem = observer<GetDemoResourceItemProps>(
  ({ resource }) => (
    <Card
      title={
        <span>
          <img
            alt=""
            css={tw`w-full h-full max-w-[50px] max-h-[50px] mr-1`}
            src={resource.cover}
          />
          {capitalize(resource.title)}
        </span>
      }
    >
      <p
        style={{
          fontSize: '14px',
        }}
      >
        {resource.description}
      </p>
      <p
        style={{
          fontSize: '12px',
          color: '#1890ff',
          margin: 0,
        }}
      >
        {resource.url}
      </p>
    </Card>
  ),
)
