import { SyncOutlined } from '@ant-design/icons'
import type { IDomain } from '@codelab/frontend/abstract/core'
import { useCurrentApp } from '@codelab/frontend/domain/app'
import { useStore } from '@codelab/frontend/presenter/container'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'

interface RefreshDomainButtonProps {
  domain: IDomain
}

export const RefreshDomainButton = observer(
  ({ domain }: RefreshDomainButtonProps) => {
    const { userService, appService, domainService } = useStore()
    const { app } = useCurrentApp(appService)

    const { loading, value } = useAsync(async () => {
      return {
        refreshDomain: () =>
          domainService.getAll({
            id: domain.id,
            appConnection: { node: { id: app?.id } },
          }),
      }
    }, [app?.id])

    return (
      <Tooltip title="Refresh">
        <Button
          icon={<SyncOutlined spin={loading} />}
          onClick={value?.refreshDomain}
          shape="circle"
          type="text"
        />
      </Tooltip>
    )
  },
)
