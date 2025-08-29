'use client'

import type { Nullable, ObjectLike } from '@codelab/shared-abstract-types'
import type { Bridge } from 'uniforms'

import { createContext, useContext } from 'react'

interface BridgeContextType {
  bridge: Nullable<Bridge>
  refershBridge(model: ObjectLike): Bridge
}

export const FormBridgeContext = createContext<BridgeContextType>({
  bridge: null,
  refershBridge: (model) => {
    return {} as Bridge
  },
})

export const useFormBridge = () => useContext(FormBridgeContext)
