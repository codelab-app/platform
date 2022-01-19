import { BadRequestError } from '@codelab/backend/abstract/core'

export const updateLambdaInvalidState = (state: string) =>
  new BadRequestError(`lambda is in ${state} and unable to be updated`)
