import { useCallback, useState } from 'react'
import { importAppUseCase } from './import-app.use-case'

export const useImportApp = () => {
  const [loading, setLoading] = useState(false)

  const importApp = useCallback(async (appFile: File) => {
    setLoading(true)

    try {
      const importResult = await importAppUseCase(appFile)

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
