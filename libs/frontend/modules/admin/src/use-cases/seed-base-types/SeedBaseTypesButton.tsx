import { Button } from 'antd'
import { useSeedBaseTypesMutation } from '../../store'

export const SeedBaseTypesButton = () => {
  const [seedBaseTypes] = useSeedBaseTypesMutation()
  const onClick = () => seedBaseTypes()

  return <Button onClick={onClick}>Seed Base Types</Button>
}
