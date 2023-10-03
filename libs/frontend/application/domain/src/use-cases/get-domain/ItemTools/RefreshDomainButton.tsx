import { SyncOutlined } from '@ant-design/icons'
import type { IDomainModel } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { AppProperties } from '@codelab/shared/domain/mapper'
import { useAsync } from '@react-hookz/web'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface RefreshDomainButtonProps {
  domain: IDomainModel
}

export const RefreshDomainButton = observer(
  ({ domain }: RefreshDomainButtonProps) => {
    const { domainService, userService } = useStore()
    const user = userService.user
    const app = useCurrentApp()

    if (!app) {
      return null
    }

    const compositeKey = AppProperties.appCompositeKey(app.name, user)

    const [{ status }, getAllDomains] = useAsync(async () =>
      domainService.getAll({
        appConnection: { node: { compositeKey } },
        id: domain.id,
      }),
    )

    return (
      <Tooltip title="Refresh">
        <Button
          icon={<SyncOutlined spin={status === 'loading'} />}
          onClick={() => getAllDomains.execute()}
          shape="circle"
          type="text"
        />
      </Tooltip>
    )
  },
)
