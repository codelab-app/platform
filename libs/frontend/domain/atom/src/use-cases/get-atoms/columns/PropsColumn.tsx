import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { IAnyType, IField, IInterfaceType } from '@codelab/frontend/abstract/core'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { fieldRef, typeRef } from '@codelab/frontend/domain/type'
import { Spinner } from '@codelab/frontend/view/components'
import { Button, Col, Dropdown, Menu, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import type { PropsColumnProps } from './types'

export const PropsColumn = observer<PropsColumnProps>(
  ({ atom, fieldService, typeService }) => {
    const [{ value: interfaceType, loading }, getInterfaceAndDescendants] =
      useAsyncFn(
        () => typeService.getInterfaceAndDescendants(atom.apiId),
        [atom.apiId],
      )

    const onEdit = (field: IField<IAnyType>) => {
      fieldService.updateModal.open(fieldRef(field.id))
    }

    const onDelete = (field: IField<IAnyType>) => {
      fieldService.deleteModal.open(fieldRef(field.id))
    }

    useEffect(() => {
      console.log('the interface has been updated!')
    }, [interfaceType])

    const editMenuItems = interfaceType?.fields.map((field) => {
      return {
        label: field.name,
        key: field.key,
        onClick: () => onEdit(field),
      }
    })

    const deleteMenuItems = interfaceType?.fields.map((field) => {
      return {
        label: field.name,
        key: field.key,
        onClick: () => onDelete(field),
      }
    })

    return (
      <Row gutter={[16, 16]} justify="center">
        <Spinner isLoading={loading}>
          {interfaceType ? (
            <>
              <Col>
                <Button
                  onClick={() =>
                    fieldService.createModal.open(
                      typeRef<IInterfaceType>(interfaceType.id),
                    )
                  }
                >
                  <PlusOutlined />
                </Button>
              </Col>
              {Boolean(interfaceType.fields.length) && (
                <>
                  <Col>
                    <Dropdown.Button overlay={<Menu items={editMenuItems} />}>
                      <EditOutlined />
                    </Dropdown.Button>
                  </Col>
                  <Col>
                    <Dropdown.Button
                      danger
                      overlay={<Menu items={deleteMenuItems} />}
                    >
                      <DeleteOutlined />
                    </Dropdown.Button>
                  </Col>
                </>
              )}
            </>
          ) : (
            <Button
              onClick={() => {
                void getInterfaceAndDescendants()
              }}
            >
              Edit API
            </Button>
          )}
        </Spinner>
      </Row>
    )
  },
)
