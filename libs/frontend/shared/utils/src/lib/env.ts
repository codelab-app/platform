import { isUndefined } from 'lodash'

export const isServer = isUndefined(window)
