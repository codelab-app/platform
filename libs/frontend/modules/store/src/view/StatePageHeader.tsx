import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithStoreService } from '../store'
import { EditStateButton } from '../use-cases'

export const StatePageHeader = observer<WithStoreService>(
  ({ storeService }) => (
    <PageHeader
      extra={[<EditStateButton storeService={storeService} />]}
      ghost={false}
      title="State"
    />
  ),
)
