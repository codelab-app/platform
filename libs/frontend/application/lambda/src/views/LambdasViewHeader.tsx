import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiHeader,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'

import { CreateLambdaButton } from '../use-cases/create-lambda'

export const LambdasViewHeader = () => {
  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.LambdaToolbarItemCreate,
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
