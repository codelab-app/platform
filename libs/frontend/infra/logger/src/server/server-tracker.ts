import { pinoLogger } from '@codelab/shared/infra/logging'

export const serverTracker = {
  useEvent: ({
    componentName,
    event,
  }: {
    componentName: string
    event: string
  }) => {
    pinoLogger.debug({
      context: componentName,
      message: `Event '${event}' triggered for component '${componentName}'`,
    })
  },
}
