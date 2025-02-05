import type { IDomainModel } from '@codelab/frontend/abstract/domain'

import SyncOutlined from '@ant-design/icons/SyncOutlined'
import { invalidateDomainListQuery } from '@codelab/frontend-domain-domain/repositories'
import {} from '@codelab/shared/infra/gqlgen'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'

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
            void invalidateDomainListQuery()
            // await trigger()
          }}
          shape="circle"
          type="text"
        />
      </Tooltip>
    )
  },
)
