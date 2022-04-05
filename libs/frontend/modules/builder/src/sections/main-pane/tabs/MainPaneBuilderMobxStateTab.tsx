import { CopyOutlined } from '@ant-design/icons'
import { ConditionalView } from '@codelab/frontend/view/components'
import { PropsData } from '@codelab/shared/abstract/core'
import { Button, Card, Tag } from 'antd'
import { keys } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { RenderService } from '../../../renderer'

type MainPaneBuilderMobxStateTabProps = {
  renderService: RenderService
}

type StateItemProps = {
  state: PropsData
}

const StateItemLabel = tw(
  Card,
)`border-gray-300 mb-1 p-2 border flex items-center justify-between`

const StateItem = observer<StateItemProps>(({ state }) => {
  return (
    <div>
      {keys(state).map((key) => {
        const value = state[key]
        const typeOfValue = typeof state[key]
        const isObject = typeOfValue === 'object'

        return (
          <>
            <StateItemLabel
              actions={[<Button icon={<CopyOutlined />} size="small" />]}
              size="small"
              title={key}
            >
              <Tag>{typeOfValue}</Tag>
            </StateItemLabel>
            <ConditionalView condition={isObject}>
              <div css={tw`ml-3`}>
                <StateItem state={value} />
              </div>
            </ConditionalView>
          </>
        )
      })}
    </div>
  )
})

export const MainPaneBuilderMobxStateTab =
  observer<MainPaneBuilderMobxStateTabProps>(({ renderService }) => {
    const { platformState } = renderService

    return <StateItem state={platformState} />
  })

MainPaneBuilderMobxStateTab.displayName = 'MainPaneBuilderMobxStateTab'
