type ErrorCallback = (reason: string) => void

type SuccessCallback = () => void

export const importData = async (
  adminData: string,
  onError: ErrorCallback,
  onSuccess: SuccessCallback,
) => {
  const response = await fetch('/api/import/admin', {
    body: adminData,
    method: 'POST',
  })

  if (response.status === 200) {
    onSuccess()
  } else {
    onError(await response.text())
  }
}
