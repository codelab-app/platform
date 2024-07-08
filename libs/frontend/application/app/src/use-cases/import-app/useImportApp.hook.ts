import { useCallback, useState } from 'react'
import { importAppAction } from './import-app.action'

export const useImportApp = () => {
  const [loading, setLoading] = useState(false)

  const importApp = useCallback(async (appFile: File) => {
    setLoading(true)

    try {
      const fileContent = await appFile.text()
      const importResult = await importAppAction(fileContent)

      return importResult
    } catch (error: unknown) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return [loading, importApp] as const
}
