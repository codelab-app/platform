import {
  IFieldService,
  ITypeRecord,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import {
  DisplayIf,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { typeRef } from '../../../../store'
import { CreateFieldButton } from '../../../fields'
import { InterfaceDefaultsButton } from '../../../interface-defaults'

interface ActionColumnProps {
  type: ITypeRecord
  typeService: ITypeService
  fieldService: IFieldService
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ type, typeService, fieldService }) => {
    return (
      <Space size="middle">
        {type.typeKind === ITypeKind.InterfaceType ? (
          <CreateFieldButton
            fieldService={fieldService}
            interfaceId={type.id}
          />
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
