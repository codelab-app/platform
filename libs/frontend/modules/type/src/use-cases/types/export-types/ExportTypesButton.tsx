import { DownloadOutlined } from '@ant-design/icons'
import { notify } from '@codelab/frontend/shared/utils'
import { Button, Tooltip } from 'antd'
import fileDownload from 'js-file-download'
import React from 'react'
import { useLazyExportTypesQuery } from '../../../store'
import { ExportTypesButtonProps } from './types'

export const ExportTypesButton = ({ typeIds }: ExportTypesButtonProps) => {
  const [getExportTypes, { isLoading }] = useLazyExportTypesQuery()

  const onClick = async () => {
    const { data, error } = await getExportTypes({
      variables: {
        input: { byIds: { typeIds } },
      },
    })

    if (data) {
      const content = JSON.stringify(data.getTypes)
      fileDownload(content, 'types.json')
    }

    if (error) {
      notify({ title: 'Error while exporting types', type: 'error' })
    }
  }

  return (
    <Tooltip title="Export types" arrowPointAtCenter>
      <Button
        disabled={typeIds.length === 0}
        icon={<DownloadOutlined />}
        loading={isLoading}
        onClick={onClick}
      >
        Export
      </Button>
    </Tooltip>
  )
}
