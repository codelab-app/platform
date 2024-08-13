import { useCallback, useState } from 'react'
import { importAppService } from './import-app.service'

export const useImportApp = () => {
  const [loading, setLoading] = useState(false)

  const importApp = useCallback(async (appData: File) => {
    setLoading(true)

    try {
      const importResult = await importAppService(appData)

      console.log(importResult)

      return importResult
    } catch (error: unknown) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return [loading, importApp] as const
}
