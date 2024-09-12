import type { QueryConfigDescriptionProps } from './types'

export const QueryConfigDescription = ({
  config,
}: QueryConfigDescriptionProps) => {
  return (
    <span>
      {config.queryKey} - {config.method} - {config.url}
    </span>
  )
}
