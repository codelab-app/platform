import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Steps {
  export const propKeys = [
    'className',
    'type',
    'current',
    'direction',
    'labelPlacement',
    'progressDot',
    'size',
    'status',
    'initial',
    'onChange',
  ]

  export const stepPropKeys = [
    'description',
    'icon',
    'status',
    'title',
    'subTitle',
    'disabled',
  ]

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type StepProps = PropsFromKeys<typeof stepPropKeys[number]>
}
