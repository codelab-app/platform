import { SyncOutlined } from '@ant-design/icons'
import type { IDomain } from '@codelab/frontend/abstract/core'
import {
  useCurrentApp,
  useStore,
} from '@codelab/frontend/presentation/container'
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
    const { _compoundName } = useCurrentApp()

    const [{ status }, getAllDomains] = useAsync(async () =>
      domainService.getAll({
        appConnection: { node: { _compoundName } },
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
