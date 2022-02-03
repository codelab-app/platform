import { DownloadOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { ExportAtomsButtonProps } from './types'

/*
 * Not functional right now, need to figure out a import strategy for neo4j
 */
export const ExportAtomsButton = ({ atomIds }: ExportAtomsButtonProps) => {
  // const [getExportAtoms, { isLoading }] = useLazyExportAtomsQuery()

  const onClick = async () => {
    // const { data, error } = await getExportAtoms({
    //   variables: {
    //     input: {
    //       where: {
    //         ids: atomIds,
    //       },
    //     },
    //   },
    // })
    // if (data) {
    //   const content = JSON.stringify(data.getAtoms)
    //   fileDownload(content, 'atoms.json')
    // }
    // if (error) {
    //   notify({ title: 'Error while exporting atoms', type: 'error' })
    // }
  }

  return (
    <Tooltip arrowPointAtCenter title="Export atoms">
      <Button
        disabled={atomIds.length === 0}
        icon={<DownloadOutlined />}
        // loading={isLoading}
        onClick={onClick}
      >
        Export
      </Button>
    </Tooltip>
  )
}
