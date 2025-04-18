import type { HttpException } from '@nestjs/common'
import type { ChangeEvent } from 'react'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend-infra-context'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { Button } from 'antd'
import { useRef } from 'react'

import { importComponentDataUseCase } from './import-component-data.use-case'

export const ImportComponentDialog = () => {
  const { setLoading } = useLoading()

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

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const componentDataFile = event.target.files?.[0]
    const formData = new FormData()

    if (componentDataFile) {
      setLoading(true)
      formData.append('file', componentDataFile)

      await importComponentDataUseCase(formData)
        .then(onSuccess)
        .catch(onError)
        .finally(() => {
          event.target.value = ''
          setLoading(false)
        })
    }
  }

  return (
    <>
      <Button
        icon={<ImportOutlined />}
        onClick={onClick}
        size="small"
        type="text"
      />
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
