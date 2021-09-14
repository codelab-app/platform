/* eslint-disable react-hooks/rules-of-hooks */

import { RecoilStateHookConfigFragment } from '@codelab/frontend/modules/element'
import { capitalizeFirstLetter } from '@codelab/shared/utils'
import { useEffect } from 'react'
import { atomFamily, useRecoilState } from 'recoil'
import { HookHandler } from '../HookHandler'

export const stateAtomFamily = atomFamily<any, any>({
  key: 'stateElement',
  default: undefined,
})

export const useRecoilStateHook: HookHandler = (
  config: RecoilStateHookConfigFragment,
) => {
  if (!config.stateKey) {
    return undefined
  }

  const [state, setState] = useRecoilState<any>(
    stateAtomFamily(config.stateKey),
  )

  useEffect(() => {
    if (typeof config.defaultValue !== 'undefined') {
      let defaultValue: any

      try {
        if (config.defaultValue) {
          defaultValue = JSON.parse(config.defaultValue)
        } else {
          defaultValue = config.defaultValue
        }
      } catch (e) {
        defaultValue = config.defaultValue
      }

      setState((s: any) => {
        if (s) {
          return s
        }

        return defaultValue
      })
    }
  }, [config.defaultValue])

  return {
    [config.stateKey]: state,
    [`set${capitalizeFirstLetter(config.stateKey)}`]: setState,
  }
}
