'use client'

import type { IPropData } from '@codelab/shared/abstract/core'

import { modelTypeKey } from 'mobx-keystone'
import { Component } from 'react'
import { isPlainObject } from 'remeda'
import { isServer } from '../env/is-server'

const isReactComponent = (value: unknown) => value instanceof Component
const isReactNode = (obj?: IPropData) => Boolean(obj?.['$$typeof'])
const isMobxModel = (obj?: IPropData) => Boolean(obj?.[modelTypeKey])

const isHtmlNode = (obj: unknown) =>
  isServer ? false : obj instanceof HTMLElement

export const isCyclic = (obj?: IPropData) =>
  (isPlainObject(obj) && isReactNode(obj)) ||
  isMobxModel(obj) ||
  isHtmlNode(obj) ||
  isReactComponent(obj)
