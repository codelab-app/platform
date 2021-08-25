import { useExportAtomsLazyQuery } from '@codelab/shared/codegen/graphql'
import { base64ToUtf8 } from '@codelab/shared/utils'
import { Button } from 'antd'
import fileDownload from 'js-file-download'
import React from 'react'

type ExportAtomsButtonProps = {
  atomIds: Array<string>
}

export const ExportAtomsButton = ({ atomIds }: ExportAtomsButtonProps) => {
  const [exportData, { loading, data }] = useExportAtomsLazyQuery()

  if (data?.exportAtoms) {
    const content = base64ToUtf8(data?.exportAtoms.payload)
    console.log(content)
    fileDownload(content, 'atoms.json')
  }

  return (
    <Button
      onClick={() =>
        exportData({
          variables: {
            input: {
              where: {
                ids: atomIds,
              },
            },
          },
        })
      }
    >
      Export
    </Button>
  )
}
