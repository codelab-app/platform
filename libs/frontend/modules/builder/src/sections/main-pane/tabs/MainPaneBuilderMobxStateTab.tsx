import { CopyOutlined } from '@ant-design/icons'
import { copyTextToClipboard } from '@codelab/frontend/shared/utils'
import { ConditionalView } from '@codelab/frontend/view/components'
import { PropsData } from '@codelab/shared/abstract/core'
import { Button, Card, message, Tag } from 'antd'
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
  parentPath: string
}

const StateItemLabel = tw(
  Card,
)`border-gray-300 mb-1 p-2 border flex items-center justify-between`

const StateItem = observer<StateItemProps>(({ state, parentPath }) => {
  return (
    <div>
      {keys(state).map((key) => {
        const value = state[key]
        const typeOfValue = typeof state[key]
        const isObject = typeOfValue === 'object'
        const path = `${parentPath}.${key}`

        const success = () => {
          message.success('Copied to clipboard !', 1)
        }

        return (
          <React.Fragment key={key}>
            <StateItemLabel
              actions={[
                <Button
                  icon={<CopyOutlined />}
                  onClick={async () => {
                    await copyTextToClipboard(path)
                    success()
                  }}
                  size="small"
                />,
              ]}
              size="small"
              title={key}
            >
              <Tag>{typeOfValue}</Tag>
            </StateItemLabel>
            <ConditionalView condition={isObject}>
              <div css={tw`ml-3`}>
                <StateItem parentPath={path} state={value} />
              </div>
            </ConditionalView>
          </React.Fragment>
        )
      })}
    </div>
  )
})

export const MainPaneBuilderMobxStateTab =
  observer<MainPaneBuilderMobxStateTabProps>(({ renderService }) => {
    const { platformState } = renderService

    return <StateItem parentPath="root" state={platformState} />
  })

MainPaneBuilderMobxStateTab.displayName = 'MainPaneBuilderMobxStateTab'
