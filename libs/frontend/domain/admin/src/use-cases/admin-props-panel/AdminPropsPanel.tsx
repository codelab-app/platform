import type {
  IField,
  IInterfaceType,
  IType,
} from '@codelab/frontend/abstract/core'
import { fieldRef, isAdmin, typeRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button, Col, Dropdown, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const AdminPropsPanel = observer<{ interfaceType: IInterfaceType }>(
  ({ interfaceType }) => {
    const { fieldService, userService } = useStore()

    if (!isAdmin(userService.user)) {
      return null
    }

    const onEdit = (field: IField<IType>) => {
      fieldService.updateModal.open(fieldRef(field.id))
    }

    const onDelete = (field: IField<IType>) => {
      fieldService.deleteModal.open(fieldRef(field.id))
    }

    const editMenuItems = interfaceType.fields.map((field) => {
      return {
        key: field.key,
        label: field.name ?? field.key,
        onClick: () => onEdit(field),
      }
    })

    const deleteMenuItems = interfaceType.fields.map((field) => {
      return {
        key: field.key,
        label: field.name ?? field.key,
        onClick: () => onDelete(field),
      }
    })

    return (
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Button
            onClick={() =>
              fieldService.createModal.open(
                typeRef<IInterfaceType>(interfaceType.id),
              )
            }
          >
            Add
          </Button>
        </Col>
        <Col>
          <Dropdown.Button menu={{ items: editMenuItems }}>
            Edit
          </Dropdown.Button>
        </Col>
        <Col>
          <Dropdown.Button danger menu={{ items: deleteMenuItems }}>
            Delete
          </Dropdown.Button>
        </Col>
      </Row>
    )
  },
)
