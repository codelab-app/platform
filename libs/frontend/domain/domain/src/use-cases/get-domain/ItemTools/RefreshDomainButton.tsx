import { SyncOutlined } from '@ant-design/icons'
import type { IDomain } from '@codelab/frontend/abstract/core'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { useAsync } from '@react-hookz/web'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface RefreshDomainButtonProps {
  domain: IDomain
}

export const RefreshDomainButton = observer(
  ({ domain }: RefreshDomainButtonProps) => {
    const { domainService } = useStore()
    const appId = useCurrentAppId()

    const [{ status }, getAllDomains] = useAsync(async () =>
      domainService.getAll({
        appConnection: { node: { id: appId } },
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
