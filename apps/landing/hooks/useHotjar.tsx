import { EnvPublic } from '@codelab/shared/env'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'

export const useHotjar = () => {
  const { id, version } = EnvPublic().hotjar
  useEffect(() => {
    hotjar.initialize(id, version)
  }, [id, version])
}
