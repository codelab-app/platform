import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { useAsyncFn } from 'react-use'

import { exportAppService } from './export-app.service'

export const useExportApp = (app: IAppModel) => {
  const [state, execute] = useAsyncFn(() => exportAppService({ id: app.id }))

  if (state.value) {
    downloadJsonAsFile(app.slug, state.value)
  }

  return { exportApp: execute, loading: state.loading }
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
