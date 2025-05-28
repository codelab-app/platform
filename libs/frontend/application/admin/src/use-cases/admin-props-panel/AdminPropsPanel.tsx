import type { IBuilderRoute } from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'

import { isAdmin } from '@codelab/frontend/abstract/domain'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { useUser } from '@codelab/frontend-application-user/services'
import { Button, Col, Dropdown, Popconfirm, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { mergeDeep } from 'remeda'

interface AdminPropsPanelProps {
  context: IBuilderRoute
  interfaceType: IInterfaceTypeModel
}

export const AdminPropsPanel = ({
  context,
  interfaceType,
}: AdminPropsPanelProps) => {
  const user = useUser()
  const router = useRouter()
  const { createPopover, removeMany, updatePopover } = useFieldService()

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
      label: (
        <Popconfirm
          onConfirm={async () => {
            await removeMany([field])
          }}
          title={`Are you sure you want to delete ${field.name ?? field.key}?`}
        >
          {field.name ?? field.key}
        </Popconfirm>
      ),
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
        <Dropdown
          disabled={!interfaceType.fields.length}
          menu={{ items: editMenuItems }}
          trigger={['click']}
        >
          <Button>Update</Button>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown
          disabled={!interfaceType.fields.length}
          menu={{ items: deleteMenuItems }}
          trigger={['click']}
        >
          <Button danger>Delete</Button>
        </Dropdown>
      </Col>
    </Row>
  )
}
