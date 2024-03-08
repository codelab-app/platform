import { prettifyForConsole } from '@codelab/shared/utils'

interface AppError extends Error {}
export class NotFoundError extends Error implements AppError {
  override name = 'NotFoundError'

  constructor(public override message: string, context?: object) {
    const data = JSON.stringify({
      context,
      message,
    })

    super(data)
  }
}
