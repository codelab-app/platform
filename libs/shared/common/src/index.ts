import type { Failure, Result, Success } from './data'
import { Endpoint } from './endpoint'
import { DecodeError } from './errors'
import { decode } from './resources'

export { DecodeError, Endpoint, decode }

export type { Success, Failure, Result }
