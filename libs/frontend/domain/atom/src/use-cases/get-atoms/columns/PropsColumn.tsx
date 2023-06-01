import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IField,
  IInterfaceType,
  IType,
} from '@codelab/frontend/abstract/core'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/core'
import { Button, Col, Dropdown, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { PropsColumnProps } from './types'

export const PropsColumn = observer<PropsColumnProps>(
  ({ atom, fieldService }) => {
    const onEdit = (field: IField<IType>) => {
      fieldService.updateModal.open(fieldRef(field.id))
    }

    const onDelete = (field: IField<IType>) => {
      fieldService.deleteModal.open(fieldRef(field.id))
    }

    const editMenuItems = atom.api.fields.map((field) => {
      return {
        key: field.key,
        label: field.name,
        onClick: () => onEdit(field),
      }
    })

    const deleteMenuItems = atom.api.fields.map((field) => {
      return {
        key: field.key,
        label: field.name,
        onClick: () => onDelete(field),
      }
    })

    return (
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Button
            onClick={() =>
              fieldService.createModal.open(
                typeRef<IInterfaceType>(atom.api.id),
              )
            }
          >
            <PlusOutlined />
          </Button>
        </Col>
        {Boolean(atom.api.fields.length) && (
          <>
            <Col>
              <Dropdown.Button menu={{ items: editMenuItems }}>
                <EditOutlined />
              </Dropdown.Button>
            </Col>
            <Col>
              <Dropdown.Button danger menu={{ items: deleteMenuItems }}>
                <DeleteOutlined />
              </Dropdown.Button>
            </Col>
          </>
        )}
      </Row>
    )
  },
)
