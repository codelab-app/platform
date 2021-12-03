import { useGetTypeQuery } from '@codelab/frontend/modules/type'
import { QueryConfigDescriptionProps } from './types'

export const QueryConfigDescription = ({
  config,
}: QueryConfigDescriptionProps) => {
  const { data } = useGetTypeQuery({
    variables: {
      input: {
        where: {
          enumTypeValueId: config.method,
        },
      },
    },
  })

  return (
    <span>
      {config.queryKey} - {data?.getType?.name} - {config.url}
    </span>
  )
}
