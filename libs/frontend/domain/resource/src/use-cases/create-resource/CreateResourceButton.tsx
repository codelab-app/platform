import { PlusOutlined } from '@ant-design/icons'
import type { IResourceService } from '@codelab/frontend/abstract/core'
import { IResourceType } from '@codelab/shared/abstract/core'
import { Button, Dropdown, Menu } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ResourceIcon } from '../../view'

export const CreateResourceButton = observer<{
  resourceService: IResourceService
}>(({ resourceService }) => {
  const menuItems: Array<ItemType> = [
    {
      children: [
        {
          icon: <ResourceIcon type={IResourceType.GraphQL} />,
          key: 'graphql',
          label: 'GraphQL API',
          onClick: () =>
            resourceService.createModal.open({ type: IResourceType.GraphQL }),
        },
        {
          icon: <ResourceIcon type={IResourceType.Rest} />,
          key: 'rest',
          label: 'Rest API',
          onClick: () =>
            resourceService.createModal.open({ type: IResourceType.Rest }),
        },
      ],
      key: 'apis',
      label: 'APIs',
      type: 'group',
    },
  ]

  return (
    <Dropdown overlay={<Menu items={menuItems} />}>
      <Button css={tw`h-full w-full`} icon={<PlusOutlined />} type="primary">
        Connect
      </Button>
    </Dropdown>
  )
})
