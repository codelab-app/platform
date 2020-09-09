import { PropsFromKeys } from '@codelab/shared/interface'

export const stepsPropKeys = [
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

export type StepsProps = PropsFromKeys<typeof stepsPropKeys[number]>

export type StepProps = PropsFromKeys<typeof stepPropKeys[number]>
