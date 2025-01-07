'use client'

import type { Nullish, ObjectLike } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'

import { diff } from 'deep-object-diff'
import { getSnapshot, isModel } from 'mobx-keystone'
import { useEffect, useRef } from 'react'

// Move renderCountMap outside the hook to make it static
const renderCountMap: Record<string, number> = {}

/**
 * Creates a hook that tracks changes between renders for mobx-keystone objects
 */
const useModelDiff = (
  context: string,
  target: Nullish<AnyModel | ObjectLike>,
) => {
  const prevModel = useRef<ObjectLike>({})

  if (!target) {
    return
  }

  // Get target object or snapshot if it's a model
  const targetObject = isModel(target) ? getSnapshot(target) : target
  const diffResult = diff(prevModel.current, targetObject)

  renderCountMap[context] = (renderCountMap[context] || 0) + 1

  console.log(
    `Comparing diff for ${context} (render #${renderCountMap[context]}):`,
    diffResult,
  )

  prevModel.current = targetObject
}

export const logging = {
  useModelDiff,
}
