export const stopOnFirstError = function () {
  if (this?.currentTest?.state === 'failed') {
    throw new Error('Some of the steps failed. Aborted further steps.')
  }
}
