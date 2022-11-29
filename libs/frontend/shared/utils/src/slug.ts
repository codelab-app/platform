import { uuidRegex } from '@codelab/shared/utils'
import slugify from 'slugify'

export const createSlug = (str: string, parent?: string) =>
  `${parent ? `${parent}-` : ''}${slugify(str, { lower: true })}`

export const extractSlug = (str: string) =>
  str.replace(uuidRegex, '').substring(1)
