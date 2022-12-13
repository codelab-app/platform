import { IPropDataByElementId } from '@codelab/frontend/abstract/core'
import { createContext } from 'react'

export const ComponentPropsContext = createContext<IPropDataByElementId>({})
