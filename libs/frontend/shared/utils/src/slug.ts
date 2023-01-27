import { uuidRegex } from '@codelab/shared/utils'
import slugify from 'voca/slugify'

/**
 * Slugs are only unique under a shared parent, hence we need to
 * append the parent id to allow same slugs under different parents.
 */
export const createSlug = (str: string, parent?: string) =>
  `${parent ? `${parent}-` : ''}${slugify(str)}`

/**
 * To reverse what createSlug did.
 */
export const extractSlug = (str: string) =>
  str.replace(uuidRegex, '').substring(1)
