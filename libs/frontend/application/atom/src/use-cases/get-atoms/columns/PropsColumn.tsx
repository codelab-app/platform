import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type {
  IFieldModel,
  IInterfaceTypeModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/domain'
import { useCreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { useDeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { useUpdateFieldModal } from '@codelab/frontend-application-type/use-cases/update-field'
import { Button, Col, Dropdown, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { AtomColumnProps } from './types'

export const PropsColumn = observer<AtomColumnProps>(({ atom }) => {
  const updateFieldModal = useUpdateFieldModal()
  const deleteFieldModal = useDeleteFieldModal()
  const createFieldModal = useCreateFieldModal()

  const onEdit = (field: IFieldModel<ITypeModel>) => {
    updateFieldModal.open(fieldRef(field))
  }

  const onDelete = (field: IFieldModel<ITypeModel>) => {
    deleteFieldModal.open(fieldRef(field))
  }

  const editMenuItems = atom.api.current.fields.map((field) => {
    return {
      key: field.key,
      label: field.name,
      onClick: () => onEdit(field),
    }
  })

  const deleteMenuItems = atom.api.current.fields.map((field) => {
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
          onClick={() => {
            if (!atom.api.id) {
              return
            }

            createFieldModal.open(typeRef<IInterfaceTypeModel>(atom.api.id))
          }}
        >
          <PlusOutlined />
        </Button>
      </Col>
      {Boolean(atom.api.current.fields.length) && (
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
})
