import { ImportOutlined } from '@ant-design/icons'
import { useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import React, { useRef } from 'react'

export const ImportAppButton = () => {
  const { onError } = useNotify(
    { title: 'App imported successfully' },
    { title: 'Failed to import app' },
  )

  const inputFile = useRef<HTMLInputElement | null>(null)
  const icon = <ImportOutlined />
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files

    if (!files?.length) {
      return
    }

    const response = await fetch('/api/import', {
      method: 'POST',
      body: await files[0]?.text(),
    })

    if (response.status !== 200) {
      const error = await response.text()

      onError(error)
    }
  }

  return (
    <>
      <Button icon={icon} onClick={onClick}>
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
