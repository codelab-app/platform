import { useStatefulExecutor } from '@codelab/frontend/shared/utils'

export const BuilderPage = () => {
  const [, state] = useStatefulExecutor(
    () => {
      return Promise.resolve({})
    },
    {
      executeOnMount: true,
    },
  )

  return null
}

BuilderPage.displayName = 'BuilderPage'
