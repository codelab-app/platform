import { RightCircleOutlined } from '@ant-design/icons'
import { ITypeService } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  DisplayIf,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import { typeRef } from '../../../../store'
import { InterfaceDefaultsButton } from '../../../interface-defaults'
import { TypeRecord } from './types'

interface ActionColumnProps {
  type: TypeRecord
  typeService: ITypeService
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ type, typeService }) => {
    return (
      <Space size="middle">
        {type.typeKind === 'InterfaceType' ? (
          <Link
            href={PageType.InterfaceDetail.replace('[interfaceId]', type.id)}
          >
            <RightCircleOutlined />
          </Link>
        ) : null}

        <DisplayIf condition={type.typeKind === ITypeKind.InterfaceType}>
          <InterfaceDefaultsButton
            interfaceId={type.id}
            typeService={typeService}
          />
        </DisplayIf>
        <ListItemEditButton
          onClick={() => typeService.updateModal.open(typeRef(type.id))}
        />
        <ListItemDeleteButton
          onClick={() => typeService.deleteModal.open(typeRef(type.id))}
        />
      </Space>
    )
  },
)
