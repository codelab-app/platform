import type {
  IFieldService,
  ITypeRecord,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { typeRef } from '../../../../store'
import { CreateFieldButton } from '../../../fields'

interface ActionColumnProps {
  fieldService: IFieldService
  type: ITypeRecord
  typeService: ITypeService
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ fieldService, type, typeService }) => {
    return (
      <Space size="middle">
        {type.kind === ITypeKind.InterfaceType ? (
          <CreateFieldButton
            fieldService={fieldService}
            interfaceId={type.id}
          />
        ) : null}

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
