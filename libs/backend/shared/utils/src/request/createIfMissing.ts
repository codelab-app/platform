import { Nullish } from '@codelab/shared/abstract/types'
import { errorIfNotFound } from './errorIfNotFound'

export const createIfMissing = async <TOut>(
  get: () => Promise<Nullish<TOut>>,
  create: () => Promise<TOut>,
): Promise<TOut> => {
  try {
    const found = await get()
    console.log({ found })

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
