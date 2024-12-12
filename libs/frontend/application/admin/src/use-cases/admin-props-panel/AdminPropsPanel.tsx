import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'

import { isAdmin } from '@codelab/frontend/abstract/domain'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { useCreateFieldForm } from '@codelab/frontend-application-type/use-cases/create-field'
import { useUser } from '@codelab/frontend-application-user/services'
import { Button, Col, Dropdown, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

export const AdminPropsPanel = observer<{ interfaceType: IInterfaceTypeModel }>(
  ({ interfaceType }) => {
    const user = useUser()
    const router = useRouter()
    const { createPopover, deletePopover, updatePopover } = useFieldService()
    const createFieldForm = useCreateFieldForm()

    if (!isAdmin(user)) {
      return null
    }

    const onEdit = (field: IFieldModel) => {
      updatePopover.open(router, field.id)
    }

    const onDelete = (field: IFieldModel) => {
      deletePopover.open(router, field.id)
    }

    const editMenuItems = interfaceType.fields.map((field) => {
      return {
        key: field.key,
        label: field.name ?? field.key,
        onClick: () => {
          onEdit(field)
        },
      }
    })

    const deleteMenuItems = interfaceType.fields.map((field) => {
      return {
        key: field.key,
        label: field.name ?? field.key,
        onClick: () => {
          onDelete(field)
        },
      }
    })

    return (
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Button
            onClick={() => {
              createFieldForm.open(interfaceType)
              createPopover.open(router)
            }}
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
