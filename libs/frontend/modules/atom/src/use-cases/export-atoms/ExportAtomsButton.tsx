import { Button } from 'antd'
import fileDownload from 'js-file-download'
import React from 'react'
import { useExportAtomsLazyQuery } from './ExportAtoms.api.graphql.gen'

type ExportAtomsButtonProps = {
  atomIds: Array<string>
}

export const ExportAtomsButton = ({ atomIds }: ExportAtomsButtonProps) => {
  const [getExportAtoms, { loading, data }] = useExportAtomsLazyQuery()

  return (
    <Button
      onClick={async () => {
        getExportAtoms({
          variables: {
            input: {
              where: {
                ids: atomIds,
              },
            },
          },
        })

        if (data) {
          const content = JSON.stringify(data.getAtoms)
          console.log(content)
          fileDownload(content, 'atoms.json')
        }
      }}
    >
      Export
    </Button>
  )
}
