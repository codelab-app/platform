import type { IBuilderRouteContext } from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'

import { isAdmin } from '@codelab/frontend/abstract/domain'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { useUser } from '@codelab/frontend-application-user/services'
import { Button, Col, Dropdown, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { mergeDeep } from 'remeda'

export const AdminPropsPanel = observer<{
  context: IBuilderRouteContext
  interfaceType: IInterfaceTypeModel
}>(({ context, interfaceType }) => {
  const user = useUser()
  const router = useRouter()
  const { createPopover, deletePopover, updatePopover } = useFieldService()

  if (!isAdmin(user)) {
    return null
  }

  const onEdit = (field: IFieldModel) => {
    updatePopover.open(
      router,
      mergeDeep(context, {
        params: {
          fieldId: field.id,
        },
      }),
    )
  }

  const onDelete = (field: IFieldModel) => {
    deletePopover.open(
      router,
      mergeDeep(context, {
        params: {
          fieldId: field.id,
        },
      }),
    )
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
          onClick={() =>
            createPopover.open(
              router,
              mergeDeep(context, {
                params: {
                  interfaceId: interfaceType.id,
                },
              }),
            )
          }
        >
          Add
        </Button>
      </Col>
      <Col>
        <Dropdown.Button menu={{ items: editMenuItems }}>Edit</Dropdown.Button>
      </Col>
      <Col>
        <Dropdown.Button danger menu={{ items: deleteMenuItems }}>
          Delete
        </Dropdown.Button>
      </Col>
    </Row>
  )
})
