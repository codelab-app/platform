'use client'

import type { Nullish, ObjectLike } from '@codelab/shared/abstract/types'
import type { AnyModel } from 'mobx-keystone'

import { logger } from '@codelab/frontend/infra/logger'
import { diff } from 'deep-object-diff'
import { getSnapshot, isModel } from 'mobx-keystone'
import { useEffect, useRef } from 'react'
// import { get } from 'stack-trace'

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

  // Get the caller's file information
  // const trace = get()
  // const callerFile = trace[1]?.getFileName() || 'unknown'

  logger.trace(
    `Comparing diff for ${context} (render #${renderCountMap[context]}) called from:`,
    diffResult,
  )

  prevModel.current = targetObject
}

export const tracker = {
  useModelDiff,
}
