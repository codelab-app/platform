import { errorIfNotFound } from './errorIfNotFound'

export const createIfMissing = async <TOut>(
  get: () => Promise<TOut | null | undefined>,
  create: () => Promise<TOut>,
): Promise<TOut> => {
  try {
    const found = await get()

    if (!found) {
      return create()
    }

    return found
  } catch (e) {
    if (errorIfNotFound(e)) {
      return create()
    }

    throw e
  }
}
