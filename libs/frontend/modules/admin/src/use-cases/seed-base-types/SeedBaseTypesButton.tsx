import { useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import { useSeedBaseTypesMutation } from '../../store'

export const SeedBaseTypesButton = () => {
  const [seedBaseTypes] = useSeedBaseTypesMutation()

  const { onSuccess, onError } = useNotify(
    {
      title: 'BaseTypes has been seeded successfully',
      type: 'success',
    },
    {
      title: 'Failed to seed BaseTypes',
      type: 'error',
    },
  )

  const onClick = () => seedBaseTypes().unwrap().then(onSuccess).catch(onError)

  return <Button onClick={onClick}>Seed Base Types</Button>
}
