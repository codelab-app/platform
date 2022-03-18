import { DownloadOutlined } from '@ant-design/icons'
import {
  extractErrorMessage,
  notify,
  useAsyncState,
} from '@codelab/frontend/shared/utils'
import { Button, Tooltip } from 'antd'
import fileDownload from 'js-file-download'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomApi } from '../../store'
import { ExportAtomsButtonProps } from './types'

export const ExportAtomsButton = observer(
  ({ atomStore }: ExportAtomsButtonProps) => {
    const [exportAtoms, { isLoading }] = useAsyncState(async () => {
      try {
        const { atoms } = await atomApi.GetAtoms({
          where: { id_IN: atomStore.selectedAtoms.map((a) => a.id) },
        })

        const content = JSON.stringify(atoms)
        fileDownload(content, 'atoms.json')
      } catch (e: any) {
        notify({
          title: 'Error while exporting atoms',
          type: 'error',
          content: extractErrorMessage(e),
        })
      }
    })

    return (
      <Tooltip arrowPointAtCenter title="Export atoms">
        <Button
          disabled={atomStore.selectedAtoms.length === 0}
          icon={<DownloadOutlined />}
          loading={isLoading}
          onClick={exportAtoms}
        >
          Export
        </Button>
      </Tooltip>
    )
  },
)
