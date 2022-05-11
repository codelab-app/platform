import { DownloadOutlined } from '@ant-design/icons'
import {
  ATOM_SERVICE,
  IMPORT_ATOM_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Button, Tooltip } from 'antd'
import fileDownload from 'js-file-download'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ExportAtomsButton = observer<
  WithServices<ATOM_SERVICE | IMPORT_ATOM_SERVICE>
>(({ importAtomService, atomService }) => {
  const [onClick, { isLoading }] = useStatefulExecutor(async () => {
    if (atomService.selectedIds.size === 0) {
      return
    }

    const content = await importAtomService.exportAtoms([
      ...atomService.selectedIds.values(),
    ])

    fileDownload(content, 'atoms.json')
  })

  return (
    <Tooltip arrowPointAtCenter title="Export atoms">
      <Button
        disabled={atomService.selectedIds.size === 0}
        icon={<DownloadOutlined />}
        loading={isLoading}
        onClick={onClick}
      >
        Export
      </Button>
    </Tooltip>
  )
})
