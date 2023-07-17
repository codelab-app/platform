import { ImportOutlined } from '@ant-design/icons'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { useNotify } from '@codelab/frontend/shared/utils'
import { useAsync } from '@react-hookz/web'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { importApp as importAppMethod } from './import-app.api'

export const ImportAppDialog = observer(() => {
  const { appService } = useStore()
  const loadAppsMethod = appService.loadAppsWithNestedPreviews
  const [{ status: appRefreshStatus }, loadApps] = useAsync(loadAppsMethod)
  const [{ status: importStatus }, importApp] = useAsync(importAppMethod)

  const { onError, onSuccess: successNotify } = useNotify(
    { title: 'App imported successfully' },
    { title: 'Failed to import app' },
  )

  const onSuccess = ({ apps }: IUserDataExport) => {
    void loadApps.execute({ id: apps[0]?.id })

    successNotify()
  }

  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files
    const appData = await files?.[0]?.text()

    if (appData) {
      await importApp.execute(appData, onError, onSuccess)
    }
  }

  return (
    <>
      {(importStatus === 'loading' || appRefreshStatus === 'loading') && (
        <Spin className="mr-2" />
      )}

      <ImportOutlined onClick={onClick} />

      <input
        accept=".json"
        onChange={onFileChange}
        ref={inputFile}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  )
})
