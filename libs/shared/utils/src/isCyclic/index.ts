import type { IPropData } from '@codelab/frontend/abstract/core'
import isObjectLike from 'lodash/isObjectLike'
import { modelTypeKey } from 'mobx-keystone'
import { isServer } from '../env/is-server'

const isReactNode = (obj?: IPropData) => Boolean(obj?.['$$typeof'])
const isMobxModel = (obj?: IPropData) => Boolean(obj?.[modelTypeKey])

const isHtmlNode = (obj: unknown) =>
  isServer ? false : obj instanceof HTMLElement

export const isCyclic = (obj?: IPropData) =>
  (isObjectLike(obj) && isReactNode(obj)) || isMobxModel(obj) || isHtmlNode(obj)
