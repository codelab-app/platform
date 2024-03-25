import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiHeader,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import React from 'react'
import { CreateLambdaButton } from '../use-cases'

export const LambdasViewHeader = () => {
  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.CreateLambda.key,
      icon: <CreateLambdaButton key={0} />,
      title: 'Create Lambda',
    },
  ]

  return (
    <CuiHeader
      toolbar={<CuiHeaderToolbar items={toolbarItems} title="Lambda" />}
      // onBack={() => router.back()}
    />
  )
}
