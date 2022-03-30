import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithActionService } from '../store'
import { CreateActionButton } from '../use-cases'

export const ActionPageHeader = observer<WithActionService>(
  ({ actionService }) => (
    <PageHeader
      extra={[<CreateActionButton actionService={actionService} />]}
      ghost={false}
      title="Actions"
    />
  ),
)
