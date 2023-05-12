export const stopOnFirstError = function (this: any) {
  // Only do this on CI to save credits
  if (process.env.CI !== 'true') {
    return
  }

  if (this?.currentTest?.state === 'failed') {
    throw new Error('Some of the steps failed. Aborted further steps.')
  }
}
