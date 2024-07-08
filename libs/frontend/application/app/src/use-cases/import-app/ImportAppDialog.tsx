import ImportOutlined from '@ant-design/icons/ImportOutlined'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import type { HttpException } from '@nestjs/common'
import { Spin } from 'antd'
import React, { useRef } from 'react'
import { useImportApp } from './useImportApp.hook'

export const ImportAppDialog = () => {
  const [loading, importApp] = useImportApp()

  const onError = useErrorNotify({
    description: (event: HttpException) => {
      return event.message
    },
    title: 'Failed to import app',
  })

  const onSuccess = useSuccessNotify({
    description: (app?: IAppModel) => {
      return `App ${app?.name} imported successfully`
    },
    title: 'App imported successfully',
  })

  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files
    const appDataFile = files?.[0]

    if (appDataFile) {
      await importApp(appDataFile).then(onSuccess).catch(onError)
    }
  }

  return (
    <>
      {loading && <Spin className="mr-2" />}
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
}
