import {
  BuildOutlined,
  DeleteOutlined,
  EditOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import {
  ComponentItemType,
  DragAndDropTypes,
  EntityType,
  PageType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Card, Dropdown, Menu, Space } from 'antd'
import { CardProps } from 'antd/lib/card'
import { useRouter } from 'next/router'
import React from 'react'
import { useDrag } from 'react-dnd'
import { useRecoilState } from 'recoil'
import { componentItemState } from './Component-item--state'

interface ComponentItemProps extends CardProps {
  item: ComponentItemType
}

const StyledMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    *:last-child {
      margin-left: 0.5rem;
    }
  }
`

export const ComponentItem = ({
  item,
  style,
  className,
  ...props
}: ComponentItemProps) => {
  const [, setState] = useRecoilState(componentItemState)
  const [, drag] = useDrag({ item, type: DragAndDropTypes.Component }, [item])

  const { openUpdateModal, openDeleteModal } = useCRUDModalForm(
    EntityType.Component,
  )

  const router = useRouter()

  const navigateToBuilder = () =>
    router.push(PageType.ComponentDetail.replace('[componentId]', item.id))

  const overlayMenu = (
    <StyledMenu>
      <Menu.Item key="1" onClick={() => navigateToBuilder()}>
        Builder
        <BuildOutlined data-testid="component-builder-button" />
      </Menu.Item>
      <Menu.Item key="1" onClick={() => openUpdateModal(item.id)}>
        Edit
        <EditOutlined data-testid="component-update-button" />
      </Menu.Item>
      <Menu.Item
        key="2"
        style={{ color: 'orangered' }}
        onClick={() => openDeleteModal([item.id])}
      >
        Delete
        <DeleteOutlined data-testid="delete-component-button" />
      </Menu.Item>
    </StyledMenu>
  )

  return (
    <div>
      <Dropdown overlay={overlayMenu} trigger={['contextMenu']}>
        <Card
          style={{
            borderRadius: 0,
            minHeight: '120px',
            ...(style || {}),
          }}
          className={`handle${className || ''}`}
          css={css({
            ':hover': {
              cursor: 'move',
            },
          })}
          {...props}
        >
          <div
            data-testid="component-grid-item"
            data-component-id={item.id}
            onDragStart={() => {
              setState({
                isDraggingComponent: true,
              })
            }}
            onDragEnd={() => {
              setState({
                isDraggingComponent: false,
              })
            }}
            ref={drag}
          >
            <Space
              direction="vertical"
              align="center"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <PictureOutlined style={{ fontSize: '30px' }} />
              <span style={{ fontSize: '12px' }}>{item.label}</span>
            </Space>
          </div>
        </Card>
      </Dropdown>
    </div>
  )
}

ComponentItem.whyDidItRender = true
