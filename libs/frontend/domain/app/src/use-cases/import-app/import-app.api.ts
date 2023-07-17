import type { IUserDataExport } from '@codelab/backend/abstract/core'

type ErrorCallback = (reason: string) => void

type SuccessCallback = (apps: IUserDataExport) => void

export const importApp = async (
  appData: string,
  onError: ErrorCallback,
  onSuccess: SuccessCallback,
) => {
  const response = await fetch('/api/import/app', {
    body: appData,
    method: 'POST',
  })

  if (response.status === 200) {
    onSuccess(await response.json())
  } else {
    onError(await response.text())
  }
}
