import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Menu, Spin } from 'antd'
import fileDownload from 'js-file-download'
import React, { CSSProperties, useEffect, useState } from 'react'
import sanitizeFilename from 'sanitize-filename'
import { AppFragment } from '../../graphql/App.fragment.graphql.gen'
import { useAppDispatch } from '../../hooks'
import { useLazyExportAppQuery } from '../../store'

export type ItemMenuProps = {
  app: AppFragment
}

const menuItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 'full',
}

const menuItemIconStyle: CSSProperties = {
  marginLeft: '1rem',
}

export const ItemDropdown = ({ app }: ItemMenuProps) => {
  const { openUpdateModal, openDeleteModal } = useAppDispatch()

  const [exportApp, { isLoading: isExporting, data: exportData }] =
    useLazyExportAppQuery()

  const [hasExported, setHasExported] = useState(false)

  const onClickExport = () => {
    setHasExported(false)

    return exportApp({
      variables: {
        input: {
          appId: app.id,
        },
      },
    })
  }

  const onClickEdit = () =>
    openUpdateModal({
      updateId: app.id,
      entity: app,
    })

  const onClickDelete = () =>
    openDeleteModal({
      deleteIds: [app.id],
      entity: app,
    })

  useEffect(() => {
    if (exportData && !hasExported) {
      const content = JSON.stringify(exportData.exportApp.payload)
      fileDownload(content, sanitizeFilename(`${app.name}.codelab.json`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportData, hasExported])

  const actionsMenu = (
    <Menu>
      <Menu.Item key="export" style={menuItemStyle} onClick={onClickExport}>
        Export
        {isExporting ? <Spin /> : <ExportOutlined style={menuItemIconStyle} />}
      </Menu.Item>

      <Menu.Item key="edit" style={menuItemStyle} onClick={onClickEdit}>
        Edit
        <EditOutlined style={menuItemIconStyle} />
      </Menu.Item>

      <Menu.Item key="delete" style={menuItemStyle} onClick={onClickDelete}>
        Delete
        <DeleteOutlined style={menuItemIconStyle} />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={actionsMenu} trigger={['click']}>
      <Button type="text" shape="circle" icon={<EllipsisOutlined />} />
    </Dropdown>
  )
}
