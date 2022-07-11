import { PlusOutlined } from '@ant-design/icons'
import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IResourceType } from '@codelab/shared/abstract/core'
import { Button, Dropdown, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ResourceIcon } from '../../view'

export const CreateResourceButton = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => {
    const menuItems: Array<ItemType> = [
      {
        key: 'databases',
        type: 'group',
        label: 'Databases',
        children: [
          {
            key: 'mysql',
            label: 'MySQL',
            onClick: () =>
              resourceService.createModal.open({ type: IResourceType.MySql }),
            icon: <ResourceIcon type={IResourceType.MySql} />,
          },
          {
            key: 'postgresql',
            label: 'PostgreSQL',
            onClick: () =>
              resourceService.createModal.open({
                type: IResourceType.PostgreSql,
              }),
            icon: <ResourceIcon type={IResourceType.PostgreSql} />,
          },
          {
            key: 'sql-server',
            label: 'SQL Server',
            onClick: () =>
              resourceService.createModal.open({
                type: IResourceType.SqlServer,
              }),
            icon: <ResourceIcon type={IResourceType.SqlServer} />,
          },
          {
            key: 'mongodb',
            label: 'MongoDB',
            onClick: () =>
              resourceService.createModal.open({ type: IResourceType.MongoDB }),
            icon: <ResourceIcon type={IResourceType.MongoDB} />,
          },
          {
            key: 'oracle',
            label: 'Oracle',
            onClick: () =>
              resourceService.createModal.open({ type: IResourceType.Oracle }),
            icon: <ResourceIcon type={IResourceType.Oracle} />,
          },
        ],
      },
      {
        key: 'apis',
        type: 'group',
        label: 'APIs',
        children: [
          {
            label: 'GraphQL API',
            key: 'graphql',
            onClick: () =>
              resourceService.createModal.open({ type: IResourceType.GraphQL }),
            icon: <ResourceIcon type={IResourceType.GraphQL} />,
          },
          {
            label: 'Rest API',
            icon: <ResourceIcon type={IResourceType.Rest} />,
            key: 'rest',
            onClick: () =>
              resourceService.createModal.open({ type: IResourceType.Rest }),
          },
        ],
      },
    ]

    return (
      <Dropdown overlay={<Menu items={menuItems} />}>
        <Button css={tw`h-full w-full`} icon={<PlusOutlined />} type="primary">
          Connect
        </Button>
      </Dropdown>
    )
  },
)
