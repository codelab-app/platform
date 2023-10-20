import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { isAdmin } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button, Col, Dropdown, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const AdminPropsPanel = observer<{ interfaceType: IInterfaceTypeModel }>(
  ({ interfaceType }) => {
    const { fieldService, userService } = useStore()

    if (!isAdmin(userService.user)) {
      return null
    }

    const onEdit = (field: IFieldModel) => {
      fieldService.updateModal.open(field)
    }

    const onDelete = (field: IFieldModel) => {
      fieldService.deleteModal.open(field)
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
          <Button onClick={() => fieldService.createModal.open(interfaceType)}>
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
