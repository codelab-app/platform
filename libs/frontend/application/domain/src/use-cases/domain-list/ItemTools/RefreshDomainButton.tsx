import SyncOutlined from '@ant-design/icons/SyncOutlined'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import {} from '@codelab/frontend/infra/gql'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { invalidateDomainListQuery } from '../domain-list.query'

interface RefreshDomainButtonProps {
  domain: IDomainModel
}

export const RefreshDomainButton = observer(
  ({ domain }: RefreshDomainButtonProps) => {
    // const [trigger, { data, error, isLoading }] = useLazySwr<
    //   GetDomainsQuery,
    //   GetDomainsQueryVariables
    // >(GetDomainsDocument)

    // const app = useCurrentApp()

    // if (!app) {
    //   return null
    // }

    // const compositeKey = AppProperties.appCompositeKey(app.name, user)

    // const [{ status }, getAllDomains] = useAsync(async () =>
    //   domainService.getAll({
    //     appConnection: { node: { compositeKey } },
    //     id: domain.id,
    //   }),
    // )

    return (
      <Tooltip title="Refresh">
        <Button
          icon={<SyncOutlined spin={false} />}
          onClick={async () => {
            invalidateDomainListQuery()
            // await trigger()
          }}
          shape="circle"
          type="text"
        />
      </Tooltip>
    )
  },
)
