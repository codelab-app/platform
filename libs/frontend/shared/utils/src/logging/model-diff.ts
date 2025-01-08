'use client'

import type { Nullish, ObjectLike } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'

import { logger } from '@codelab/frontend/infra/logger'
import { diff } from 'deep-object-diff'
import { getSnapshot, isModel } from 'mobx-keystone'
import { useEffect, useRef } from 'react'
import { useCustomCompareEffect } from 'react-use'
import { isDeepEqual } from 'remeda'

// Move renderCountMap outside the hook to make it static
const renderCountMap: Record<string, number> = {}

/**
 * Gets a plain object representation of a model or object
 */
const getObjectOrSnapshot = (target: Nullish<AnyModel | ObjectLike>) => {
  return isModel(target) ? getSnapshot(target) : target
}

/**
 * Creates a hook that tracks changes between renders for mobx-keystone objects
 *
 * Make sure not to use after a conditional in component due to `useRef` usage internally
 */
export const useModelDiff = (
  context: string,
  target: Nullish<AnyModel | ObjectLike>,
) => {
  const prevModel = useRef<ObjectLike>({})

  useEffect(() => {
    const targetObject = getObjectOrSnapshot(target)
    const diffResult = diff(prevModel.current, targetObject)

    renderCountMap[context] = (renderCountMap[context] || 0) + 1

    logger.debug(
      `Comparing diff for "${context}" (render #${renderCountMap[context]})`,
      { data: diffResult },
    )

    prevModel.current = targetObject
  }, [context, target])
}

export const tracker = {
  useModelDiff,
}
