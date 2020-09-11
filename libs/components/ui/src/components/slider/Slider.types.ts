import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Slider {
  export const propKeys = [
    'autoFocus',
    'defaultValue',
    'disabled',
    'dots',
    'included',
    'marks',
    'max',
    'min',
    'range',
    'reverse',
    'step',
    'tipFormatter',
    'value',
    'vertical',
    'onAfterChange',
    'onChange',
    'tooltipPlacement',
    'tooltipVisible',
    'getTooltipPopupContainer',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
