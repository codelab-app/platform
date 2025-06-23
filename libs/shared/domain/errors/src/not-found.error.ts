import type { ObjectLike } from '@codelab/shared-abstract-types'

type AppError = Error

export class NotFoundError extends Error implements AppError {
  override name = 'NotFoundError'

  constructor(public override message: string, context?: ObjectLike) {
    const data = JSON.stringify({
      context,
      message,
    })

    super(data)
  }
}
