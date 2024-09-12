import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { isAdmin } from '@codelab/frontend/abstract/domain'
import { useCreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { useDeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { useUpdateFieldModal } from '@codelab/frontend-application-type/use-cases/update-field'
import { useUser } from '@codelab/frontend-application-user/services'
import { Button, Col, Dropdown, Row } from 'antd'
import { observer } from 'mobx-react-lite'

export const AdminPropsPanel = observer<{ interfaceType: IInterfaceTypeModel }>(
  ({ interfaceType }) => {
    const user = useUser()
    const updateFieldModal = useUpdateFieldModal()
    const createFieldModal = useCreateFieldModal()
    const deleteFieldModal = useDeleteFieldModal()

    if (!isAdmin(user)) {
      return null
    }

    const onEdit = (field: IFieldModel) => {
      updateFieldModal.open(field)
    }

    const onDelete = (field: IFieldModel) => {
      deleteFieldModal.open(field)
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
              createFieldModal.open(interfaceType)
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
