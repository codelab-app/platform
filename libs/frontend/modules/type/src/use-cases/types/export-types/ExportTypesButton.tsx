import { DownloadOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { ExportTypesButtonProps } from './types'

export const ExportTypesButton = ({ typeIds }: ExportTypesButtonProps) => {
  // const [getExportTypes, { isLoading }] = useLazyExportTypesQuery()
  //
  // const onClick = async () => {
  //   const { data, error } = await getExportTypes({
  //     variables: {
  //       input: { where: { ids: typeIds } },
  //     },
  //   })
  //
  //   if (data) {
  //     const content = JSON.stringify(data.getTypes)
  //     fileDownload(content, 'types.json')
  //   }
  //
  //   if (error) {
  //     notify({ title: 'Error while exporting types', type: 'error' })
  //   }
  // }

  return (
    <Tooltip arrowPointAtCenter title="Export types">
      <Button
        disabled={typeIds.length === 0}
        icon={<DownloadOutlined />}
        // loading={isLoading}
        // onClick={onClick}
      >
        Export
      </Button>
    </Tooltip>
  )
}
