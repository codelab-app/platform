import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Button {
  export const propKeys = [
    'disabled',
    'ghost',
    'href',
    'htmlType',
    'icon',
    'loading',
    'shape',
    'size',
    'target',
    'type',
    'onClick',
    'block',
    'danger',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
