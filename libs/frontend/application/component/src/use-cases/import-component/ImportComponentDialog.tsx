import ImportOutlined from '@ant-design/icons/ImportOutlined'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import type { HttpException } from '@nestjs/common'
import { useAsync } from '@react-hookz/web'
import React, { useRef } from 'react'
import { importComponentDataUseCase } from './import-component-data.use-case'

export const ImportComponentDialog = () => {
  const [{ status }, importComponent] = useAsync(importComponentDataUseCase)
  const loading = status === 'loading'
  const Icon = loading ? LoadingOutlined : ImportOutlined

  const onError = useErrorNotify({
    description: (event: HttpException) => event.message,
    title: 'Failed to import component',
  })

  const onSuccess = useSuccessNotify({
    description: '',
    title: 'Component imported successfully',
  })

  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files
    const componentDataFile = files?.[0]
    const formData = new FormData()

    if (componentDataFile) {
      formData.append('file', componentDataFile)

      await importComponent.execute(formData).then(onSuccess).catch(onError)
    }
  }

  return (
    <>
      <Icon onClick={onClick} />
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
