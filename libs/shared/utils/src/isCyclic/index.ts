import type { IPropData } from '@codelab/shared/abstract/core'
import { modelTypeKey } from 'mobx-keystone'
import { isObjectType } from 'remeda'
import { isServer } from '../env/is-server'

const isReactNode = (obj?: IPropData) => Boolean(obj?.['$$typeof'])
const isMobxModel = (obj?: IPropData) => Boolean(obj?.[modelTypeKey])

const isHtmlNode = (obj: unknown) =>
  isServer ? false : obj instanceof HTMLElement

export const isCyclic = (obj?: IPropData) =>
  (isObjectType(obj) && isReactNode(obj)) || isMobxModel(obj) || isHtmlNode(obj)
