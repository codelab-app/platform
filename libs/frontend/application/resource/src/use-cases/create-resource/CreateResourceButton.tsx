import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend/application/shared/store'
import { IResourceType } from '@codelab/shared/abstract/core'
import { Button, Dropdown } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../views'

export const CreateResourceButton = observer(() => {
  const { resourceService } = useStore()

  const menuItems: Array<ItemType> = [
    {
      children: [
        {
          icon: <ResourceIcon type={IResourceType.GraphQl} />,
          key: 'graphql',
          label: 'GraphQL API',
          onClick: () =>
            resourceService.createModal.open({ type: IResourceType.GraphQl }),
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
    <Dropdown menu={{ items: menuItems }}>
      <Button className="size-full" icon={<PlusOutlined />} type="primary">
        Connect
      </Button>
    </Dropdown>
  )
})
