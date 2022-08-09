import { ErrorBoundary } from '@codelab/frontend/view/components'
import { IBuilderComponent } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const GetComponentsList = observer<{
  components: Array<IBuilderComponent>
}>(({ components = [] }) => {
  return (
    <ErrorBoundary>
      {components.map((component) => {
        return (
          <div css={tw`m-1 mb-6 mr-6 cursor-pointer`}>
            <Card css={tw`mr-16`} hoverable title={<b>{component.name}</b>}>
              <img alt="" src="/codelab-logo-default.svg" />
            </Card>
          </div>
        )
      })}
    </ErrorBoundary>
  )
})
