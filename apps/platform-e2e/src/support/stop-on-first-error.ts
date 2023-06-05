import { getEnv } from '@codelab/shared/config'

export const stopOnFirstError = function (this: any) {
  // Only do this on CI to save credits
  console.log('circleci', getEnv().circleci)

  if (getEnv().circleci.ci) {
    return
  }

  if (this?.currentTest?.state === 'failed') {
    throw new Error('Some of the steps failed. Aborted further steps.')
  }
}
