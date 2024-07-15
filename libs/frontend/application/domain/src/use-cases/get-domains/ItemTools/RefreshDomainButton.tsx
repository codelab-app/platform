import SyncOutlined from '@ant-design/icons/SyncOutlined'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import {
  type GetDomainsQuery,
  type GetDomainsQueryVariables,
} from '@codelab/frontend/infra/gql'
import { useLazySwr } from '@codelab/frontend/infra/graphql'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { AppProperties } from '@codelab/shared/domain'
import { useAsync } from '@react-hookz/web'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import useSWR from 'swr'
import { GetDomainsDocument } from '../get-domains.document'
import {
  domainListUseCase,
  invalidateDomainListQuery,
} from '../get-domains.use-case'

interface RefreshDomainButtonProps {
  domain: IDomainModel
}

export const RefreshDomainButton = observer(
  ({ domain }: RefreshDomainButtonProps) => {
    const [trigger, { data, error, isLoading }] = useLazySwr<
      GetDomainsQuery,
      GetDomainsQueryVariables
    >(GetDomainsDocument)

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
          icon={<SyncOutlined spin={isLoading} />}
          onClick={async () => {
            invalidateDomainListQuery()
            await trigger()
          }}
          shape="circle"
          type="text"
        />
      </Tooltip>
    )
  },
)
