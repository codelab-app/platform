import { PropsData } from '@codelab/shared/abstract/core'
import { createElement } from 'react'

export type RenderOutput = {
  ReactComponent: Parameters<typeof createElement>[0]
  props: PropsData
} | null
