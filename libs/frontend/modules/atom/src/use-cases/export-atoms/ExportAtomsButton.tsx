import { DownloadOutlined } from '@ant-design/icons'
// import { notify } from '@codelab/frontend/shared/utils'
import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
// import fileDownload from 'js-file-download'
import React from 'react'
import { ExportAtomsButtonProps } from './types'

/*
 * Not functional right now, need to figure out a import strategy for neo4j
 */
export const ExportAtomsButton = observer(
  ({ atomIds, atomStore }: ExportAtomsButtonProps) => {
    // const [getExportAtoms, { isLoading }] = useLazyGetAtomsQuery()

    const onClick = async () => {
      alert(
        'Not functional right now, need to figure out a import strategy for neo4j',
      )
      // const { data, error } = await getExportAtoms({
      //   variables: {
      //     where: {
      //       id_IN: atomIds,
      //     },
      //   },
      // })
      //
      // if (data) {
      //   const content = JSON.stringify(data.atoms)
      //   fileDownload(content, 'atoms.json')
      // }
      //
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
  },
)
