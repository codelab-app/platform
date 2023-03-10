import { ImportOutlined } from '@ant-design/icons'
import type { IAppService } from '@codelab/frontend/abstract/core'
import { useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import React, { useRef } from 'react'
import importApp from './import-app.api'

export const ImportAppContainer = ({
  appService,
}: {
  appService: IAppService
}) => {
  const { onError } = useNotify(
    { title: 'App imported successfully' },
    { title: 'Failed to import app' },
  )

  const onSuccess = () => appService.getAll()
  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files
    const appData = await files?.[0]?.text()

    if (appData) {
      await importApp(appData, onError, onSuccess)
    }
  }

  return (
    <>
      <Button icon={<ImportOutlined />} onClick={onClick}>
        Import App
      </Button>

      <input
        accept=".json"
        onChange={onFileChange}
        ref={inputFile}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  )
}
