import { RecoilStateDescriptionProps } from './types'

export const RecoilStateDescription = ({
  config,
}: RecoilStateDescriptionProps) => {
  return (
    <span>
      {config.stateKey}{' '}
      {config.defaultValue ? `Default: ${config.defaultValue}` : ''}
    </span>
  )
}
