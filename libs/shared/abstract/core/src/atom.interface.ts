import type { FilterRecordKeys } from '@codelab/shared/abstract/types'
import type { IAtomType } from './atom-type.enum'

/**
 * This is the record we still extend
 *
 * We provide a prefix to get the subset of records
 */
export type IAtomBaseRecords<
  AtomData = unknown,
  Prefix extends string = '',
> = FilterRecordKeys<Record<IAtomType, AtomData>, Prefix>
