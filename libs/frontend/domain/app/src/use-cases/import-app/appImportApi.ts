type ErrorCallback = (reason: string) => void
type SuccessCallback = () => void

const importApp = async (
  appData: string,
  onError: ErrorCallback,
  onSuccess: SuccessCallback,
) => {
  const response = await fetch('/api/import', {
    body: appData,
    method: 'POST',
  })

  if (response.status === 200) {
    onSuccess()
  } else {
    onError(await response.text())
  }
}

export default importApp
