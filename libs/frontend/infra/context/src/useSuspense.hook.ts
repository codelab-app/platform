const wrapPromise = <T>(promise: Promise<T>): { read(): T } => {
  let status: 'error' | 'pending' | 'success' = 'pending'
  let result: T
  let error: Error | null = null

  const suspender = promise.then(
    (res: T) => {
      status = 'success'
      result = res
    },
    (err: Error) => {
      status = 'error'
      error = err
    },
  )

  return {
    read: () => {
      console.log(status)

      if (status === 'pending') {
        throw suspender
      }

      if (status === 'error') {
        throw error
      }

      return result as T
    },
  }
}

/* Function to wrap a non-promise function into a promise */

export const suspensify = <T>(fn: () => T): { read(): T } => {
  return wrapPromise(
    new Promise<T>((resolve, reject) => {
      try {
        const result = fn()

        resolve(result)
      } catch (error) {
        reject(error)
      }
    }),
  )
}
