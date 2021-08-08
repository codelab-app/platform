import { errorIsNotFound } from './errorIsNotFound'

export const createIfNotExisting = async <TIn, TOut>(
  input: TIn,
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
    if (errorIsNotFound(e)) {
      return create()
    }

    throw e
  }
}
