import { useCallback, useState } from 'react'
import { importAppService } from './import-app.service'

export const useImportApp = () => {
  const [loading, setLoading] = useState(false)

  const importApp = useCallback(async (appData: File) => {
    setLoading(true)

    try {
      const formData = new FormData()

      formData.append('file', appData)

      const importResult = await importAppService(formData)

      console.log(importResult)

      return importResult
    } catch (error: unknown) {
      console.log(error)

      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return [loading, importApp] as const
}
