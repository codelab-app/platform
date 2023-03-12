type ErrorCallback = (reason: string) => void

type SuccessCallback = () => void

export const importApp = async (
  appData: string,
  onError: ErrorCallback,
  onSuccess: SuccessCallback,
) => {
  const response = await fetch('/api/import/app', {
    method: 'POST',
    body: appData,
    method: 'POST',
  })

  if (response.status === 200) {
    onSuccess()
  } else {
    onError(await response.text())
  }
}
