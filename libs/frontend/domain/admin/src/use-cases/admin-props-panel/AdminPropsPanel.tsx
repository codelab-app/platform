import type {
  IAnyType,
  IField,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { isAdmin } from '@codelab/frontend/abstract/core'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { fieldRef, typeRef } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import { Button, Col, Dropdown, Menu, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const AdminPropsPanel = observer<{ interfaceType: IInterfaceType }>(
  ({ interfaceType }) => {
    const { fieldService, userService } = useStore()

    if (!isAdmin(userService.user)) {
      return null
    }

    const onEdit = (field: IField<IAnyType>) => {
      fieldService.updateModal.open(fieldRef(field.id))
    }

    const onDelete = (field: IField<IAnyType>) => {
      fieldService.deleteModal.open(fieldRef(field.id))
    }

    const editMenuItems = interfaceType.fields.map((field) => {
      return {
        label: field.name,
        key: field.key,
        onClick: () => onEdit(field),
      }
    })

    const deleteMenuItems = interfaceType.fields.map((field) => {
      return {
        label: field.name,
        key: field.key,
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
          <Dropdown.Button overlay={<Menu items={editMenuItems} />}>
            Edit
          </Dropdown.Button>
        </Col>
        <Col>
          <Dropdown.Button danger overlay={<Menu items={deleteMenuItems} />}>
            Delete
          </Dropdown.Button>
        </Col>
      </Row>
    )
  },
)
