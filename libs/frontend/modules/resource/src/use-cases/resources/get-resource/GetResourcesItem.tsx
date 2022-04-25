import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { ListItemButton } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { Resource, resourceRef, WithResourceService } from '../../../store'

export type GetResourcesItemProps = WithResourceService & {
  resource: Resource
}

export const GetResourcesItem = observer<GetResourcesItemProps>(
  ({ resource, resourceService }) => {
    const onEdit = () =>
      resourceService.updateModal.open(resourceRef(resource.id))

    const onDelete = () =>
      resourceService.deleteModal.open(resourceRef(resource.id))

    const href = {
      pathname: PageType.Resource,
      query: { resourceId: resource.id },
    }

    return (
      <div css={tw`flex flex-row  items-center`}>
        <Link href={href}>
          <a css={tw`flex-grow`}>{resource.name}</a>
        </Link>

        <ListItemButton icon={<EditFilled />} onClick={onEdit} />
        <ListItemButton
          danger={true}
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
      </div>
    )
  },
)
