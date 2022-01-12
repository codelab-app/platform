import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Mutation, Response } from 'dgraph-js-http'
import { v4 } from 'uuid'
import { ITransaction } from '../transaction-manager'
import { mergeMutations } from '../utils/mergeMutations'

/**
 * Merges multiple mutations using {@see mergeMutations} and runs the mutation
 * @param mutations the list of mutations to merge
 * @param transaction the transaction to run the mutation in
 */
export const mergeAndMutate = (
  transaction: ITransaction,
  ...mutations: Array<Mutation>
) => {
  const merged = mergeMutations(...mutations)

  return transaction.mutate(merged)
}

/**
 * Extracts the uid out of the uidsMap of a response
 * Throws error if the uid is not found
 *
 * @param response the response from the dgraph mutation
 * @param blankNodeLabel the label of the blank node
 */
export const getUidFromResponse = (
  response: Response,
  blankNodeLabel: string,
) => {
  if (blankNodeLabel.startsWith('_:')) {
    // Remove the leading '_:' if left out, since dgraph returns only the labels as keys
    blankNodeLabel = blankNodeLabel.substring(2)
  }

  const id = (response.data as any).uids[blankNodeLabel] as string

  if (!id) {
    throw new Error(
      `Error while processing dgraph response, uid with label ${blankNodeLabel} not found`,
    )
  }

  return id
}

/**
 * Creates a {@see CreateResponsePort} that extracts the uid out of the uidsMap of a response
 * @param response the response from the dgraph mutation
 * @param blankNodeLabel the label of the blank node
 */
export const makeCreateResponse = (
  response: Response,
  blankNodeLabel: string,
): CreateResponsePort => {
  return { id: getUidFromResponse(response, blankNodeLabel) }
}

/**
 * Creates a list of {@see CreateResponsePort} for each entry in the blankNodeLabels
 * that extracts the uid out of the uidsMap of a response
 * @param response the response from the dgraph mutation
 * @param blankNodeLabels the labels of the blank nodes
 */
export const makeCreateResponses = (
  response: Response,
  blankNodeLabels: Array<string>,
): Array<CreateResponsePort> => {
  return blankNodeLabels.map((uid) => makeCreateResponse(response, uid))
}

const filterIsString = (maybe: Maybe<any>): maybe is string => {
  return typeof maybe === 'string' && !!maybe
}

/**
 * Combines all filters with the specified separator into a single string
 * @param filters
 * @param separator
 */
export const combineFilters = (
  filters: Array<Maybe<string | false>>,
  separator: 'AND' | 'OR',
): string => {
  return filters.filter(filterIsString).join(` ${separator} `)
}

export const randomBlankNode = () => {
  return `_:${v4()}`
}
