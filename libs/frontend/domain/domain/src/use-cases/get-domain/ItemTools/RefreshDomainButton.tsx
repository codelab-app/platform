import { SyncOutlined } from '@ant-design/icons'
import type { IDomain } from '@codelab/frontend/abstract/core'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'

interface RefreshDomainButtonProps {
  domain: IDomain
}

export const RefreshDomainButton = observer(
  ({ domain }: RefreshDomainButtonProps) => {
    const { domainService } = useStore()
    const appId = useCurrentAppId()

    const { loading, value } = useAsync(async () => {
      return {
        refreshDomain: () =>
          domainService.getAll({
            id: domain.id,
            appConnection: { node: { id: appId } },
          }),
      }
    }, [appId])

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
