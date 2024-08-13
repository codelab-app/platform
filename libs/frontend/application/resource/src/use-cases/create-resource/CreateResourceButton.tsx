import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { IResourceType } from '@codelab/shared/abstract/core'
import { Button, Dropdown } from 'antd'
import type { ItemType } from 'antd/lib/menu/interface'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../views'
import { useCreateResourceModal } from './create-resource.state'

export const CreateResourceButton = observer(() => {
  const createResourceModal = useCreateResourceModal()

  const menuItems: Array<ItemType> = [
    {
      children: [
        {
          icon: <ResourceIcon type={IResourceType.GraphQl} />,
          key: 'graphql',
          label: 'GraphQL API',
          onClick: () =>
            createResourceModal.open({ type: IResourceType.GraphQl }),
        },
        {
          icon: <ResourceIcon type={IResourceType.Rest} />,
          key: 'rest',
          label: 'Rest API',
          onClick: () => createResourceModal.open({ type: IResourceType.Rest }),
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
