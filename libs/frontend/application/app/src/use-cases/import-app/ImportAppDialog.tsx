'use client'

import type { IAppDto } from '@codelab/shared-abstract-core'
import type { HttpException } from '@nestjs/common'

import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend-infra-context'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useImportApp } from './useImportApp.hook'

export const ImportAppDialog = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const importApp = useImportApp()

  const onError = useErrorNotify({
    description: (event: HttpException) => {
      return event.message
    },
    title: 'Failed to import app',
  })

  const onSuccess = useSuccessNotify({
    description: (app?: IAppDto) => {
      return `App ${app?.name} imported successfully`
    },
    title: 'App imported successfully',
  })

  const onFileChange = async () => {
    const files = inputRef.current?.files
    const appDataFile = files?.[0]

    if (appDataFile) {
      await importApp(appDataFile)
        .then(onSuccess)
        .catch(onError)
        .finally(() => router.back())
    }
  }

  useEffect(() => {
    inputRef.current?.click()
    inputRef.current?.addEventListener('cancel', () => router.back())
  }, [router, inputRef])

  return (
    <input
      accept=".json"
      onChange={onFileChange}
      ref={inputRef}
      style={{ display: 'none' }}
      type="file"
    />
  )
}
