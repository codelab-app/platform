import { ImportOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useRef } from 'react'

export const ImportAppButton = () => {
  const icon = <ImportOutlined />
  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  return (
    <>
      <Button icon={icon} onClick={onClick}>
        Import App
      </Button>

      <input
        accept=".json"
        onChange={async (event) => {
          event.stopPropagation()
          event.preventDefault()

          const files = inputFile.current?.files

          if (!files?.length) {
            return
          }

          await fetch('/api/import', {
            method: 'POST',
            body: await files[0]?.text(),
          })
        }}
        ref={inputFile}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  )
}
