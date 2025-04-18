import type { IAppModel } from '@codelab/frontend-abstract-domain'

import { downloadJsonAsFile } from '@codelab/frontend-shared-utils'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { useAsyncFn } from 'react-use'

import { exportAppService } from './export-app.service'

export const useExportApp = (app: IAppModel) => {
  const { setLoading } = useLoading()

  const [state, execute] = useAsyncFn(() => {
    setLoading(true)

    return exportAppService({ id: app.id }).finally(() => {
      setLoading(false)
    })
  })

  if (state.value) {
    downloadJsonAsFile(app.slug, state.value)
  }

  return execute
}

export const useApp = () => {
  const args = [1, 2]

  const demoFunction = async (a: number, b: number) => {
    return Promise.resolve(a + b)
  }

  const [state, execute] = useAsyncFn(demoFunction, args)

  return {
    error: state.error,
    execute,
    loading: state.loading,
    value: state.value,
  }
}
