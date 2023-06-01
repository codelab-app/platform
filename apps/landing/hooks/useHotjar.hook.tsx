import { getEnv } from '@codelab/shared/config'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'

export const useHotjar = () => {
  const { id, version } = getEnv().hotjar
  useEffect(() => {
    hotjar.initialize(id, version)
  }, [id, version])
}
