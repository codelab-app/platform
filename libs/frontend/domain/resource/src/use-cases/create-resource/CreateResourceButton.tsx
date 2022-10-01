import { PlusOutlined } from '@ant-design/icons'
import { IResourceService, IResourceType } from '@codelab/shared/abstract/core'
import { Button, Dropdown, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ResourceIcon } from '../../view'

export const CreateResourceButton = observer<{
  resourceService: IResourceService
}>(({ resourceService }) => {
  const menuItems: Array<ItemType> = [
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
})
