import { SyncOutlined } from '@ant-design/icons'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { IDomain } from '@codelab/shared/abstract/core'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface RefreshDomainButtonProps {
  domain: IDomain
}

export const RefreshDomainButton = observer(
  ({ domain }: RefreshDomainButtonProps) => {
    const { appService, domainService } = useStore()
    const { app } = useCurrentApp(appService)

    const [refreshDomain, { isLoading }] = useStatefulExecutor(
      () =>
        domainService.getAll({
          id: domain.id,
          appConnection: { node: { id: app?.id } },
        }),
      {
        executorDeps: [app?.id],
        executeOnMount: false,
      },
    )

    return (
      <Tooltip title="Refresh">
        <Button
          icon={<SyncOutlined spin={isLoading} />}
          onClick={refreshDomain}
          shape="circle"
          type="text"
        />
      </Tooltip>
    )
  },
)
