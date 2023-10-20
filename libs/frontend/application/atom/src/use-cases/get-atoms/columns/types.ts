import type { IAtomModel } from '@codelab/frontend/abstract/domain'

/**
 * Passed as 2nd argument in table render function, shared across columns
 */
export interface AtomColumnProps {
  atom: IAtomModel
}

export type ActionColumnProps = AtomColumnProps
